//@ts-check
import * as Koa from "koa"

/**
 * @param {Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>} ctx
 * @param {Koa.Next} next
 */
async function logger(ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next): Promise<void> {
    const { URL, method, request } = ctx
    const { rawBody } = request

    console.log(`${method} ${URL.toString()}`)
    if(rawBody) {
        console.log(`Request body: ${rawBody}`)
    }

    await next()
}

export default logger