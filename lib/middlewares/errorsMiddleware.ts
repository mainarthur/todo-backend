//@ts-check
import * as Koa from "koa"


/**
 * @param {Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>} ctx
 * @param {Koa.Next} next
 */
async function errorsMiddleware(ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next): Promise<void> {
  try {
    await next()
  } catch (err) {
    if (err instanceof Koa.HttpError) {
      const { status } = err
      const errMessage: string = err.originalError ? err.originalError.message : err.message

      switch (status) {
        case 401:
          ctx.status = 401
          ctx.body = {
            status: false,
            error: errMessage
          }
          ctx.set("X-Status-Reason", errMessage)
          break
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
    } else {
      throw err
    }
  }
}

export default errorsMiddleware