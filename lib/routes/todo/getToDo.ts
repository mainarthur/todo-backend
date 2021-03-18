//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import { Types } from 'mongoose'
import Board from '../../models/Board'
import ToDo from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload }, URL, params: { id: _id } } = ctx
  const { id: userId }: UserPayload = payload

  const boardId: string = URL.searchParams.get('boardId')

  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })
  if (board) {
    const toDo = await ToDo.findOne({
      _id,
      boardId: Types.ObjectId(boardId)
    }).exec()

    if (toDo) {
      ctx.status = 200
      ctx.body = {
        status: true,
        result: toDo
      }
    } else {
      ctx.throw(400, "ToDo not found")
    }
  } else {
    ctx.throw(400, "Board not found")
  }
}