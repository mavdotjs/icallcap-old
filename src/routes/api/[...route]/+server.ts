import { api } from '$lib/common/hono'

export async function fallback({ request, locals }) {
	return api.fetch(request, { locals })
}
