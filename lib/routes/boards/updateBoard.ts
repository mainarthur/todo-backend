//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import Board from '../../models/Board'
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import UpdateBoard from '../typings/UpdateBoard'
import { UpdateToDoRequest } from "../typings/UpdateToDoRequest"
import * as admin from 'firebase-admin'
import FirebaseToken from '../../models/FirebaseToken'


/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function updateBoard(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { request, state: { payload } }: { request: Request, state: { payload: UserPayload } } = ctx
  const { body }: { body?: UpdateBoard } = request
  const { id: userId }: UserPayload = payload

  const {
    id,
    name,
  }: UpdateBoard = body

  const board = await Board.findOne({
    _id: id,
    users: userId
  })

  if (board) {
    if (typeof name == "string" && name.trim() != "") {
      board.name = name
    }

    await board.save()

    const firebaseTokens = await FirebaseToken.find({
      userId,
    })
    for (let i = 0; i < firebaseTokens.length; i++) {
      const { token } = firebaseTokens[i]

      try {
        await admin.messaging().sendToDevice(token, {
          notification: {
            title: 'Board updated',
            body: `Board "${board.name}" is updated`
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
      result: board
    }

  } else {
    ctx.throw(400, "Board not found")
  }

}