import 'server-only';

import {
  createHash,
  createHmac,
  timingSafeEqual,
} from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const STAFF_COOKIE_NAME = 'haita_staff_session';
const SESSION_VERSION = 'v1';
const SESSION_DURATION_SECONDS = 12 * 60 * 60;

function getAuthConfig(): { password: string; sessionSecret: string } | null {
  const password = process.env.STAFF_DASHBOARD_PASSWORD;
  const sessionSecret = process.env.STAFF_SESSION_SECRET;

  if (!password || !sessionSecret || sessionSecret.length < 32) return null;
  return { password, sessionSecret };
}

function safeStringEqual(left: string, right: string): boolean {
  const leftDigest = createHash('sha256').update(left).digest();
  const rightDigest = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function signSessionPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function isValidSessionToken(token: string, secret: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [version, expiresAtRaw, signature] = parts;
  const expiresAt = Number(expiresAtRaw);
  const now = Math.floor(Date.now() / 1000);

  if (
    version !== SESSION_VERSION ||
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= now ||
    expiresAt > now + SESSION_DURATION_SECONDS
  ) {
    return false;
  }

  const payload = `${version}.${expiresAtRaw}`;
  const expectedSignature = signSessionPayload(payload, secret);
  return safeStringEqual(signature, expectedSignature);
}

export function isStaffAuthConfigured(): boolean {
  return getAuthConfig() !== null;
}

export function verifyStaffPassword(candidate: string): boolean {
  const config = getAuthConfig();
  if (!config) return false;
  return safeStringEqual(candidate, config.password);
}

export async function createStaffSession(): Promise<void> {
  const config = getAuthConfig();
  if (!config) {
    throw new Error(
      'Staff authentication is not configured. Set STAFF_DASHBOARD_PASSWORD and STAFF_SESSION_SECRET.',
    );
  }

  const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = `${SESSION_VERSION}.${expiresAt}`;
  const token = `${payload}.${signSessionPayload(payload, config.sessionSecret)}`;

  (await cookies()).set(STAFF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearStaffSession(): Promise<void> {
  (await cookies()).set(STAFF_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: 0,
  });
}

export async function hasValidStaffSession(): Promise<boolean> {
  const token = (await cookies()).get(STAFF_COOKIE_NAME)?.value;
  const config = getAuthConfig();
  if (!config) return false;

  return token ? isValidSessionToken(token, config.sessionSecret) : false;
}

export async function requireStaffSession(): Promise<void> {
  if (!(await hasValidStaffSession())) {
    redirect('/admin/login');
  }
}
