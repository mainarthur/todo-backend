//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import Board from '../../models/Board'
import { UserPayload } from '../auth/UserPayload'
import DeleteBoard from '../typings/DeleteBoard'
import AddUserToBoard from '../typings/AddUserToBoard'
import User from '../../models/User'

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
    board.users.push(userId)

    await board.save()

    ctx.status = 200
    ctx.body = {
      status: true,
      result: board.toJSON()
    }
  } else {
    ctx.throw(400, "Board or user not found")
  }
}