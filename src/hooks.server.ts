import { lucia } from '$lib/server/auth'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	// @ts-expect-error
	event.locals.auth = {}
	const sessionId = event.cookies.get(lucia.sessionCookieName)
	if (!sessionId) {
		event.locals.auth.user = null
		event.locals.auth.session = null
		return resolve(event)
	}

	const { session, user } = await lucia.validateSession(sessionId)
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		})
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		})
	}
	event.locals.auth.user = user
	event.locals.auth.session = session
	return await resolve(event)
}
