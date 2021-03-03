//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { ObjectId, Schema } from "mongoose"
import { UpdateToDoRequest } from "../requests/UpdateToDoRequest"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function updateToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { request, state: { payload } }: { request: Request, state: { payload: UserPayload } } = ctx
    const { body }: { body?: UpdateToDoRequest } = request
    const { id: userId }: { id: ObjectId } = payload

    const {
        _id, 
        text, 
        done, 
        position, 
    }: { 
        _id: ObjectId, 
        text: string, 
        done: boolean, 
        position: number, 
    } = body

    const toDo: ToDoDocument = await ToDo.findOne({
        userId,
        _id
    }).exec()

    if(toDo) {
        if(typeof text == "string" && text.trim() != "") {
            toDo.text = text
        }

        if(done != null) {
            toDo.done = done
        }

        if(position) {
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
}