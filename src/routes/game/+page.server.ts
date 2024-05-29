import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.auth.user) redirect(302, '/auth')
}
