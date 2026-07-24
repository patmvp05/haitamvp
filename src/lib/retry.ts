const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Run `fn`, retrying on rejection up to `tries` total attempts with linear
 * backoff (`delayMs`, then `2 * delayMs`, …). Rethrows the last error if every
 * attempt fails. Used to ride out transient hotel Wi-Fi / Supabase blips.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  tries = 2,
  delayMs = 500,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < tries) await sleep(delayMs * attempt);
    }
  }
  throw lastError;
}
