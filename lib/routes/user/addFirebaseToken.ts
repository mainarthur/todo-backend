//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import { UserPayload } from '../auth/UserPayload'
import addFirebaseToken from '../typings/AddFirebaseToken'
import FirebaseToken from '../../models/FirebaseToken'
import * as admin from 'firebase-admin'

const serviceAccount = require('../../../serviceAccoutKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

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

    await admin.auth().verifyIdToken(token)
    await tokenDoc.save()

    ctx.status = 200
    ctx.body = {
      status: true
    }
  } catch (err) {
    ctx.throw(400, "Invalid firebase token")
  }
}