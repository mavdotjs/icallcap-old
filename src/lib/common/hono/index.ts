import { gameRouter } from './game'
import { createRouter } from './router'

const router = createRouter()
	.get('/whoami', (ctx, n) => {
		const user = ctx.env.locals.auth.user
		if (!user) return ctx.json(null)
		return ctx.json({
			id: user.id,
			username: user.username,
		})
	})
	.route('/game', gameRouter)

export const api = createRouter().route('/api', router)
export type Router = typeof router
