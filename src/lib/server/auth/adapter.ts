import { type DatabaseSession, type DatabaseUser, type Adapter } from 'lucia'
import { db, schema } from '$lib/server/db'
import { type Document } from '@olli/kvdex'

export const adapter: Adapter = {
	async deleteSession(sessionId) {
		await db.auth.session.delete(sessionId)
	},
	async deleteUserSessions(userId) {
		await db.auth.session.deleteBySecondaryIndex('userId', userId)
	},
	async getSessionAndUser(sessionId) {
		const sessionResult = await db.auth.session.find(sessionId)
		if (!sessionResult) return [null, null]
		const userResult = await db.auth.users.find(sessionResult.value.userId)
		if (!userResult) return [null, null]
		return [intoDBSession(sessionResult), intoDBUser(userResult)]
	},
	async getUserSessions(userId) {
		return (await db.auth.session.findBySecondaryIndex('userId', userId)).result.map(intoDBSession)
	},
	async setSession(session) {
		await db.auth.session.set(session.id, {
			expiresAt: session.expiresAt,
			userId: session.userId,
			...session.attributes,
		})
	},
	async updateSessionExpiration(sessionId, expiresAt) {
		await db.auth.session.update(sessionId, {
			expiresAt: expiresAt,
		})
	},
	async deleteExpiredSessions() {
		await db.auth.session.deleteMany({
			filter: (doc) => doc.value.expiresAt <= new Date(),
		})
	},
}

function intoDBUser(user: Document<schema.User>): DatabaseUser {
	const { id, ...attributes } = user.flat()
	return { id: id.toString(), attributes }
}

function intoDBSession(session: Document<schema.Session>): DatabaseSession {
	const { id, userId, expiresAt, ...attributes } = session.flat()
	return { id: id.toString(), userId, expiresAt, attributes }
}
