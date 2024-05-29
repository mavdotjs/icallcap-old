import { redirect } from '@sveltejs/kit'

export async function GET({ locals }) {
	console.log(locals)
	if (locals.auth.user) {
		redirect(302, '/game')
	} else {
		redirect(302, '/auth')
	}
}
