/**
 * Thrown when the guest screen cannot load the data it needs (Supabase
 * unreachable or misconfigured). Caught by the route's error boundary, which
 * shows the "can't reach hotel systems" fallback instead of a blank crash.
 */
export class HotelSystemsUnavailableError extends Error {
  constructor(message = 'Unable to reach hotel systems', options?: ErrorOptions) {
    super(message, options);
    this.name = 'HotelSystemsUnavailableError';
  }
}
