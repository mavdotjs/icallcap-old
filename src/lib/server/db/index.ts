import { collection, kvdex } from '@olli/kvdex'
import * as schema from './schema'
import { openKv } from "@deno/kv"
const kv = await openKv()

export const db = kvdex(kv, {
	auth: {
		users: collection(schema.UserModel),
		session: collection(schema.SessionModel, {
			indices: {
				userId: 'secondary',
			},
		}),
	},
	games: collection(schema.GameModel, {
		indices: {
			id: 'primary'
		},
	}),
})

export { schema }