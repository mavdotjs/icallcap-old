// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthLocals
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

type AuthLocals =
	| {
			user: import('lucia').User
			session: import('lucia').Session
	  }
	| { user: null; session: null }

export {}
