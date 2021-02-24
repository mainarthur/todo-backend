//@ts-check
import Koa from "koa"

/**
 * @param {Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>} ctx
 * @param {Koa.Next} next
 */
async function logger(ctx, next) {
    const { request } = ctx
    const { URL, method, rawBody } = request

    console.log(`${method} ${URL.toString()}`)
    if(rawBody) {
        console.log(`Request body: ${rawBody}`)
    }

    await next()
}

export default logger