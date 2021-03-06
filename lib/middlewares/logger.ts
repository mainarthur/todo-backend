import { DefaultContext, DefaultState, Next, ParameterizedContext, Request } from "koa"

/**
 * @param {Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>} ctx
 * @param {Koa.Next} next
 */


async function logger(ctx: ParameterizedContext<DefaultState, DefaultContext, any>, next: Next): Promise<void> {
  const { URL, method, request } = ctx
  const { rawBody } = request

  console.log(`${method} ${URL.toString()}`)

  if (rawBody) {
    console.log(`Request body: ${rawBody}`)
  }

  await next()
}

export default logger