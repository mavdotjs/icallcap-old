import z from 'zod'
export { z }

export type User = z.infer<typeof UserModel>
export const UserModel = z.object({
	username: z.string(),
    display_name: z.string(),
    last_cache: z.date(),
    access_token: z.string()
})

export type Session = z.infer<typeof SessionModel>
export const SessionModel = z.object({
	userId: z.string(),
	expiresAt: z.date(),
})

export enum Suit {
	Clubs = 'C',
	Spades = 'S',
	Hearts = 'H',
	Diamonds = 'D',
}

export type Card = z.infer<typeof CardType>
export const CardType = z.object({
	suit: z.nativeEnum(Suit),
	rank: z.number().min(1).max(13),
})

export type Move = z.infer<typeof MoveType>
export const MoveType = z.object({
	userId: z.string(),
	cards: z.array(CardType),
	claim: CardType,
})

export type Player = z.infer<typeof PlayerType>
export const PlayerType = z.object({
	userId: z.string(),
	hand: z.array(CardType),
	score: z.array(CardType),
	playing: z.boolean()
})

export type Game = z.infer<typeof GameModel>
export const GameModel = z.object({
	id: z.string(),
	monarchId: z.string(),
	stack: z.array(MoveType),
	players: z.map(z.string(), PlayerType),
	currentTurn: z.number(),
	turnOrder: z.array(z.string()),
})
