//@ts-check
import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import Board from '../../models/Board'
import FirebaseToken from '../../models/FirebaseToken'
import { UserPayload } from "../auth/UserPayload"
import { NewBoardRequest } from '../typings/NewBoardRequest'
import * as admin from 'firebase-admin'
/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function createBoard(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { request: { body }, state: { payload } } = ctx

  const { id: userId }: UserPayload = payload
  const { name }: NewBoardRequest = body ?? { name: '' }


  if (typeof name === "string" && name?.trim() !== "") {

    const board = new Board({
      name,
      users: [userId]
    })

    board.position = (await Board.findOne({ users: userId }).sort({ position: -1 }).exec() ?? { position: 0 }).position + 1

    await board.save()

    const firebaseTokens = await FirebaseToken.find({
      userId,
    })
    for (let i = 0; i < firebaseTokens.length; i++) {
      const { token } = firebaseTokens[i]

      try {
        await admin.messaging().sendToDevice(token, {
          notification: {
            title: 'New board',
            body: `New board: "${name}"`
          }
        })
      } catch (err) {
        console.log(err)
        await firebaseTokens[i].deleteOne()
      }
    }
    ctx.status = 200
    ctx.body = {
      status: true,
      result: board.toJSON()
    }
  } else {
    if (name == null) {
      ctx.throw(400, "Board name is not passed")
    } else if (typeof name === "string" && name.trim() === "") {
      ctx.throw(400, "Board name is empty")
    } else {
      ctx.throw(400, "Board name should be string")
    }
  }
}