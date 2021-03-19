//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import Board from '../../models/Board'

import ToDo from "../../models/ToDo"
import { UserPayload } from '../auth/UserPayload'

import { DeleteManyToDos } from '../typings/DeleteManyToDos'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteAllToDos(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { request: { body }, state: { payload } } = ctx

  const { todos, boardId }: DeleteManyToDos = body
  const { id: userId }: UserPayload = payload


  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })

  if (board) {
    const lastUpdate = Date.now()

    const toDos: {
      ok: number
      n: number
      nModified: number
    } = await ToDo.updateMany({
      _id: {
        $in: todos
      },
      boardId
    }, {
      $set: {
        deleted: true,
        lastUpdate
      }
    }).exec()

    if (toDos.nModified > 0) {
      ctx.status = 200
      ctx.body = {
        status: true,
        lastUpdate
      }
    } else {
      ctx.throw(400, "ToDos not found")
    }
  } else {
    ctx.throw(400, "Board not found")
  }

}