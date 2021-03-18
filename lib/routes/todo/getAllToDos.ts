//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { Types } from "mongoose"
import Board from '../../models/Board'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getAllToDos(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload }, URL }: { state: { payload: UserPayload }, URL: URL } = ctx
  const { id: userId }: UserPayload = payload

  const from: number = parseInt(URL.searchParams.get("from"))
  const boardId: string = URL.searchParams.get('boardId')

  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })
  if (board) {

    if (isNaN(from)) {
      ctx.status = 200
      ctx.body = {
        status: true,
        results: await ToDo.find({ boardId: Types.ObjectId(boardId) }).exec()
      }
    } else {
      ctx.status = 200
      ctx.body = {
        status: true,
        results: await ToDo.find({
          boardId: Types.ObjectId(boardId),
          lastUpdate: {
            $gt: from
          }
        }).exec()
      }
    }

  } else {
    ctx.throw(400, "Board not found")
  }
}