//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import Board from '../../models/Board'
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { UpdateToDoRequest } from "../requests/UpdateToDoRequest"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function updateToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { request, state: { payload } }: { request: Request, state: { payload: UserPayload } } = ctx
  const { body }: { body?: UpdateToDoRequest } = request
  const { id: userId }: UserPayload = payload

  const {
    _id,
    text,
    done,
    position,
    boardId,
  }: UpdateToDoRequest = body

  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })

  if (board) {
    const toDo: ToDoDocument = await ToDo.findOne({
      boardId,
      _id
    }).exec()

    if (toDo) {
      if (typeof text == "string" && text.trim() != "") {
        toDo.text = text
      }

      if (done != null) {
        toDo.done = done
      }

      if (position) {
        toDo.position = position
      }


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