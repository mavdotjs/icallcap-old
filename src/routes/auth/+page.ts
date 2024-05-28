import { redirect } from '@sveltejs/kit';

export async function  load({}) {
    redirect(302, "https://itch.io/user/oauth?client_id=4f7b2e4557c1daab47e1502c58c141ca&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2Fauth%2Fcallback")
}