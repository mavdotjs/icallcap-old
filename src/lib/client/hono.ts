import type { Router } from '$lib/common/hono'
import { hc } from 'hono/client'

let browserClient: ReturnType<typeof hc<Router>>
export default function createClient(fetch: Window['fetch']) {
	const isBrowser = typeof window !== 'undefined'
	const origin = isBrowser ? window.location.origin : ''
	if (isBrowser && browserClient) {
		return browserClient
	}

	const client = hc<Router>(origin + '/api', { fetch })
	if (isBrowser) {
		browserClient = client
	}

	return client
}
