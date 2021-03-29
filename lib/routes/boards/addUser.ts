//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import Board from '../../models/Board'
import { UserPayload } from '../auth/UserPayload'
import AddUserToBoard from '../typings/AddUserToBoard'
import User from '../../models/User'
import FirebaseToken from '../../models/FirebaseToken'
import * as admin from 'firebase-admin'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function addUser(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload }, request: { body } } = ctx
  const { id: userId }: UserPayload = payload
  const { boardId, email }: AddUserToBoard = body

  const board = await Board.findOne({
    _id: boardId,
    users: userId,
  })

  const user = await User.findOne({
    email,
  })

  if (board && user) {
    if (!board.users.find(userId => userId.toHexString() === user.id))
      board.users.push(user.id)

    await board.save()

    const firebaseTokens = await FirebaseToken.find({
      userId,
    })
    for (let i = 0; i < firebaseTokens.length; i++) {
      const { token } = firebaseTokens[i]

      try {
        await admin.messaging().sendToDevice(token, {
          notification: {
            title: 'New user in the board',
            body: `${user.name} joined "${board.name}" board`
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
    ctx.throw(400, "Board or user not found")
  }
}