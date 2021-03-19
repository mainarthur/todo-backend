//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import { UserPayload } from "../auth/UserPayload"
import Board from '../../models/Board'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getBoards(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
  const { state: { payload } } = ctx
  const { id: userId }: UserPayload = payload

  const boards = await Board.find({
    users: userId
  }).exec()


  ctx.status = 200
  ctx.body = {
    status: true,
    results: boards
  }
}