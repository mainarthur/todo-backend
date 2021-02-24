//@ts-check
import Koa from "koa"


/**
 * @param {Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>} ctx
 * @param {Koa.Next} next
 */
async function errorsMiddleware(ctx, next) {
    try {
        await next()
    } catch (err) {
        if (err.status === 401 || err.status == 400) {
            const errMessage = err.originalError ? err.originalError.message : err.message

            ctx.status = err.status
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

export default errorsMiddleware