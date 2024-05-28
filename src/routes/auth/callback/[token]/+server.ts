import { lucia } from '$lib/server/auth/index.js'
import { db } from '$lib/server/db/index.js'
import { redirect } from '@sveltejs/kit'

export async function GET({params: { token }, cookies }) {
    const userResponse = await fetch(`https://itch.io/api/1/${token}/me`)
    const json = await userResponse.json()
    const { user } = json
    console.log(json)

    await db.auth.users.set(user.id.toString(), {
        access_token: token,
        last_cache: new Date(),
        display_name: user.display_name,
        username: user.username
    })
    const session = await lucia.createSession(user.id.toString(), {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
    })
    redirect(302, "/")
}