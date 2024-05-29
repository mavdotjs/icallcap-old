import { z } from 'zod'

export enum Suit {
	Clubs = 'clubs',
	Spades = 'spades',
	Hearts = 'hearts',
	Diamonds = 'diamonds',
}

export enum Color {
	Black = 'black',
	Red = 'red',
}

export enum Rank {
	Ace = 'ace',
	Two = '2',
	Three = '3',
	Four = '4',
	Five = '5',
	Six = '6',
	Seven = '7',
	Eight = '8',
	Nine = '9',
	Ten = '10',
	Jack = 'jack',
	Queen = 'queen',
	King = 'king',
}

export type Card = z.infer<typeof CardType>
export const CardType = z.union([
	z.object({
		type: z.literal('normal'),
		suit: z.nativeEnum(Suit),
		rank: z.nativeEnum(Rank),
	}),
	z.object({
		type: z.literal('joker'),
		color: z.nativeEnum(Color),
	}),
])
