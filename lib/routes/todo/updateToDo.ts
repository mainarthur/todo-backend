//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { Schema } from "mongoose"
import { UpdateToDoRequest } from "../requests/UpdateToDoRequest"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function updateToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { request, state: { payload } }: { request: Request, state: { payload: UserPayload } } = ctx
    const { body }: { body?: UpdateToDoRequest } = request
    const { id: userId }: { id: string } = payload

    const {
        _id, 
        text, 
        done, 
        position, 
        lastUpdate, 
        deleted
    }: { 
        _id: string, 
        text: string, 
        done: boolean, 
        position: number, 
        lastUpdate: number, 
        deleted: boolean 
    } = body

    const toDo: ToDoDocument = await ToDo.findOne({
        userId: new Schema.Types.ObjectId(userId),
        _id: new Schema.Types.ObjectId(_id)
    }).exec()

    if(toDo) {
        if(typeof text == "string" && text.trim() != "") {
            toDo.text = text
        }

        if(done != null) {
            toDo.done = done
        }

        if(deleted != null) {
            toDo.deleted = deleted
        }

        if(position) {
            toDo.position = position
        }

        if(lastUpdate) {
            toDo.lastUpdate = lastUpdate
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