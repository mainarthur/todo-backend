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
        const { status } = err
        const errMessage = err.originalError ? err.originalError.message : err.message

        console.log(status)
        console.log(errMessage)

        switch (status) {
            case 401:
                ctx.status = 401
                ctx.body = {
                    status: false,
                    error: errMessage
                }
                ctx.set("X-Status-Reason", errMessage)
                break;
            case 400:
                ctx.status = 400
                ctx.body = {
                    status: false,
                    error: `Bad request: ${errMessage}`
                }
                ctx.set("X-Status-Reason", errMessage)
                break
            case 404:
                ctx.status = 404
                ctx.body = {
                    status: false,
                    error: `Not found`
                }
                ctx.set("X-Status-Reason", errMessage)
                break
            default:
                throw err
        }

    }
}

export default errorsMiddleware