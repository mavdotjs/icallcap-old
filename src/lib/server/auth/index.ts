import { Lucia } from "lucia";
import { adapter } from './adapter'
import { schema } from "$lib/server/db"
export * as bcrypt from "@ts-rex/bcrypt"

export const lucia = new Lucia(adapter, {
    getUserAttributes(attributes) {
        return attributes
    },
    getSessionAttributes(attributes) {
        return attributes
    }
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: schema.User;
        DatabaseSessionAttributes: Omit<schema.Session,  "userId" | "expiresAt">
	}
}
