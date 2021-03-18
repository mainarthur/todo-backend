//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { ObjectId } from "mongoose"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { state: { payload }, params: { id: _id } } = ctx
    const { id: userId }: { id: ObjectId } = payload
    const body


    const toDo: ToDoDocument = await ToDo.findOne({
        _id,
        boardId
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

}