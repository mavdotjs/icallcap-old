import { Hono } from "hono"
import { streamSSE } from 'hono/streaming'

const router = new Hono<{ Bindings: { locals: App.Locals } }>().get("/whoami", (ctx, n) => {
    const user = ctx.env.locals.user
    if(!user) return ctx.json(null);
    return ctx.json({
        id: user.id,
        username: user.username,
        display_name: user.display_name
    })
})

export const api = new Hono<{ Bindings: { locals: App.Locals } }>().route("/api", router);
export type Router = typeof router