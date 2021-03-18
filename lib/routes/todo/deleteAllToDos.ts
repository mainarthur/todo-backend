//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { ObjectId } from "mongoose"
import { DeleteManyToDos } from '../requests/DeleteManyToDos'

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteAllToDos(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { state: { payload }, request }: { state: { payload: UserPayload}, request: Request } = ctx
    const { body: {todos, boardId} }: { body?: DeleteManyToDos } = request

    const lastUpdate = Date.now()

    const toDos: {
        ok: number;
        n: number;
        nModified: number;
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

}