import 'server-only';
import QRCode from 'qrcode';

/** Render `text` as a base64 PNG data URI, generated server-side. */
export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 320,
    color: { dark: '#000000', light: '#ffffff' },
  });
}

/** Escape the reserved characters in a Wi-Fi QR field per the WIFI: URI scheme. */
function escapeWifiField(value: string): string {
  return value.replace(/([\\;,":])/g, '\\$1');
}

/**
 * Build a `WIFI:` payload a phone camera can scan to auto-join the network.
 * Assumes WPA/WPA2 (the common hotel case).
 */
export function buildWifiQrPayload(ssid: string, password: string): string {
  return `WIFI:T:WPA;S:${escapeWifiField(ssid)};P:${escapeWifiField(password)};;`;
}
