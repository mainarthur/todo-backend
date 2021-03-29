//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import Board from '../../models/Board'
import { UserPayload } from '../auth/UserPayload'
import DeleteBoard from '../typings/DeleteBoard'
import FirebaseToken from '../../models/FirebaseToken'
import * as admin from 'firebase-admin'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteBoard(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload }, request: { body } } = ctx
  const { id: userId }: UserPayload = payload
  const { boardId }: DeleteBoard = body

  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })

  if (board) {
    board.deleted = true
    await board.save()

    const firebaseTokens = await FirebaseToken.find({
      userId,
    })
    for (let i = 0; i < firebaseTokens.length; i++) {
      const { token } = firebaseTokens[i]

      try {
        await admin.messaging().sendToDevice(token, {
          notification: {
            title: 'Board deleted',
            body: `Board "${board.name}" is deleted`
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
    ctx.throw(400, "Board not found")
  }
}