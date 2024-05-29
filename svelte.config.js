import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from 'sveltekit-adapter-deno'
import { Float16Array } from '@petamoriken/float16'
global.Float16Array = Float16Array // <- Required for some stuff kvdex does under the hood

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
	},
}

export default config
