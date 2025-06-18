import { getPayload, Payload } from 'payload'
import config from '@payload-config'

type PayloadCache = {
  client: Payload | null
  promise: Promise<Payload> | null
}

declare global {
  // we need to use `var` here to extend the global object with new properties //
  // eslint-disable-next-line no-var
  var payload: PayloadCache | undefined
}

// Create a cached payload instance to avoid re-initializing on every request
let cached = global.payload

if (!cached) {
  // In development, we attach this to `global`
  // In production, module-level variables are shared between requests
  cached = global.payload = { client: null, promise: null }
}

export async function getCachedPayload(): Promise<Payload> {
  if (cached!.client) {
    return cached!.client
  }

  if (!cached!.promise) {
    cached!.promise = getPayload({ config })
  }

  try {
    cached!.client = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.client
}

// Helper to clear the cache if needed (useful for testing or manual cache invalidation)
export function clearPayloadCache(): void {
  if (cached) {
    cached.client = null
    cached.promise = null
  }
}
