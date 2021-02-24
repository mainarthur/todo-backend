//@ts-check
import Koa from "koa"


/**
 * @param {Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>} ctx
 * @param {Koa.Next} next
 */
async function jwtError(ctx, next) {
    try {
        await next()
    } catch (err) {
        if (err.status === 401) {
            const errMessage = err.originalError ? err.originalError.message : err.message

            ctx.status = 401
            ctx.body = {
                status: false,
                error: errMessage
            }

            ctx.set("X-Status-Reason", errMessage)
        } else {
            throw err
        }
    }
}

export default jwtError