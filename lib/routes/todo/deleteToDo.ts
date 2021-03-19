//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { ObjectId } from "mongoose"
import { DeleteToDo } from '../typings/DeleteToDo'
import Board from '../../models/Board'
import { UserPayload } from '../auth/UserPayload'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload }, request: { body } } = ctx
  const { id: userId }: UserPayload = payload
  const { toDoId, boardId }: DeleteToDo = body

  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })

  if (board) {

    const toDo: ToDoDocument = await ToDo.findOne({
      boardId,
      _id: toDoId,
    }).exec()

    if (toDo) {
      toDo.deleted = true
      await toDo.save()

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