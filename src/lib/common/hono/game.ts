import { streamSSE } from 'hono/streaming'
import { createRouter } from './router'
import { db } from '$lib/server/db'
import { generateIdFromEntropySize } from 'lucia'
import { zValidator } from '@hono/zod-validator'
import { type Game, type Player } from '$lib/server/db/schema'
import { Color, Rank, Suit, type Card } from '$lib/common/types/cards'
import { z } from 'zod'

function shuffleArray<T>(array: Array<T>) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}

function generateCards(jokers: boolean): Card[] {
	const cards: Card[] = []
	if (jokers) {
		cards.push({ type: 'joker', color: Color.Black }, { type: 'joker', color: Color.Red })
	}
	for (const suit of Object.values(Suit)) {
		for (const rank of Object.values(Rank)) {
			cards.push({ type: 'normal', rank, suit })
		}
	}
	return cards
}

export const gameRouter = createRouter()
	.post(
		'/create',
		zValidator(
			'json',
			z.object({
				jokers: z.boolean(),
			}),
		),
		async (c, n) => {
			if (!c.env.locals.auth.user) return c.json({ fail: true, error: 'Not logged in' }, 401)
			const { jokers } = c.req.valid('json')
			const gameId = generateIdFromEntropySize(10)
			await db.games.set(gameId, {
				monarchId: c.env.locals.auth.user.id,
				currentTurn: null,
				players: new Map<string, Player>(),
				stack: [],
				turnOrder: [],
				playing: false,
				settings: {
					jokers,
				},
			} satisfies Game)
			return c.json({ fail: false, result: { gameId } })
		},
	)
	.get('/:id/join', (c, n) => {
		return streamSSE(c, (s) => {
			s
		})
	})
	.post('/:id/start', async (c, n) => {
		if (!c.env.locals.auth.user) return c.json({ fail: true, error: 'Not logged in' }, 401)
		const gameId = c.req.param('id')
		const gameRes = await db.games.find(gameId)
		if (gameRes == null) return c.json({ fail: true, error: 'Game not found' }, 400)
		const game = gameRes.flat()
		if (game.monarchId !== c.env.locals.auth.user.id)
			return c.json({ fail: true, error: "This isn't your game" })
		const deck = generateCards(game.settings.jokers)
		const playersArray = Array.from(game.players.entries())
		while (deck.length > 0) {
			playersArray.map(([k, v]) => {
				const card = deck.pop()
				if (card) {
					v.hand.push(card)
				}
				return [k, v]
			})
		}
		const players = new Map(playersArray)
		const turnOrder = shuffleArray(Array.from(players.keys()))
		await db.games.update(gameId, {
			players,
			playing: true,
			turnOrder,
			currentTurn: 0,
		})
		return c.json({ fail: false, message: 'OK' }, 200)
	})
