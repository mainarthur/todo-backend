//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { Schema } from "mongoose"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { state: { payload }, params: { id: _id } }: { state: { payload: UserPayload }, params: { id: string } } = ctx
    const { id: userId }: { id: string } = payload


    const toDo: ToDoDocument = await ToDo.findOne({
        _id,
        userId: new Schema.Types.ObjectId(userId)
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