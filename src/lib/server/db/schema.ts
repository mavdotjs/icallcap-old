import { CardType } from '$lib/common/types/cards'
import z from 'zod'
export { z }

export type User = z.infer<typeof UserModel>
export const UserModel = z.object({
	username: z.string(),
	password_hash: z.string(),
})

export type Session = z.infer<typeof SessionModel>
export const SessionModel = z.object({
	userId: z.string(),
	expiresAt: z.date(),
})

export type Move = z.infer<typeof MoveType>
export const MoveType = z.object({
	userId: z.string(),
	cards: z.array(CardType),
	claim: CardType,
})

export type Player = z.infer<typeof PlayerType>
export const PlayerType = z.object({
	hand: z.array(CardType),
	score: z.array(CardType),
	playing: z.boolean(),
})

export type Game = z.infer<typeof GameModel>
export const GameModel = z.object({
	monarchId: z.string(),
	stack: z.array(MoveType),
	players: z.map(z.string(), PlayerType),
	playing: z.boolean().default(false),
	currentTurn: z.number().nullable(),
	turnOrder: z.array(z.string()),
	settings: z.object({
		jokers: z.boolean(),
	}),
})
