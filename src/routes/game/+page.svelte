<!-- All of my client-side game logic here -->

<script lang="ts">
	import createClient from '$lib/client/hono'
	import { onMount } from 'svelte'
	const client = createClient((input, init) => fetch(input, { credentials: 'include', ...init }))
	onMount(async () => {
		console.log(await (await client.whoami.$get()).json())
		console.log(client.game[':id'].join.$url({ param: { id: 'gayporn' } }))
	})
</script>
