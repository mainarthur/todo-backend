//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import { UserPayload } from '../auth/UserPayload'
import addFirebaseToken from '../typings/AddFirebaseToken'
import FirebaseToken from '../../models/FirebaseToken'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function addFirebaseToken(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload }, request: { body } } = ctx
  const { id: userId }: UserPayload = payload
  const { token }: addFirebaseToken = body



  try {
    const tokenDoc = new FirebaseToken({
      token,
      userId,
    })
    await tokenDoc.save()

    ctx.status = 200
    ctx.body = {
      status: true
    }
  } catch (err) {
    console.log(err)
    ctx.throw(400, "Invalid firebase token")
  }
}