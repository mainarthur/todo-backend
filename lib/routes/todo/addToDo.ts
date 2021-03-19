//@ts-check
import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import Board from '../../models/Board'

import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"

import { NewToDoRequest } from "../typings/NewToDoRequest"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function addToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { request: { body }, state: { payload } } = ctx

  const { id: userId }: UserPayload = payload
  const { text, boardId }: NewToDoRequest = body ?? { text: '', boardId: '' }

  const board = await Board.findOne({
    _id: boardId,
    users: userId
  })

  if (typeof text === "string" && text?.trim() !== "" && board) {
    const toDo: ToDoDocument = new ToDo({
      text,
      userId,
      boardId
    })

    toDo.position = (await ToDo.findOne({ userId }).sort({ position: -1 }).exec() ?? { position: 0 }).position + 1

    await toDo.save()

    ctx.status = 200
    ctx.body = {
      status: true,
      result: toDo.toJSON()
    }
  } else {
    if (!board) {
      ctx.throw(400, "Board not found")
    } else if (text == null) {
      ctx.throw(400, "ToDo text is not passed")
    } else if (typeof text === "string" && text.trim() === "") {
      ctx.throw(400, "ToDo text is empty")
    } else {
      ctx.throw(400, "ToDo text should be string")
    }
  }
}