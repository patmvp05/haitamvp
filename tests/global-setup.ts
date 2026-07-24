import { startMockSupabaseIfNeeded } from './mock-supabase';

export default async function globalSetup() {
  await startMockSupabaseIfNeeded();
}
