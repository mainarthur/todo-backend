//@ts-check
import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo, { ToDoDocument } from "../../models/ToDo"
import { NewToDoRequest } from "../requests/NewToDoRequest"
import { ObjectId, Types } from "mongoose"
import { UserPayload } from "../auth/UserPayload"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function addToDo(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { request, state: { payload } }: { request: Request, state: { payload: UserPayload } } = ctx
    const { body }: { body?: NewToDoRequest } = request

    const { id: userId }: { id: ObjectId } = payload
    const { text } = body ?? { text: "" }


    if (typeof text === "string" && text?.trim() !== "") {
        const toDo: ToDoDocument = new ToDo({
            text,
            userId
        })

        toDo.position = (await ToDo.findOne({ userId }).sort('-LAST_MOD').exec() ?? { position: 0 }).position + 1

        await toDo.save()

        ctx.status = 200
        ctx.body = {
            status: true,
            result: toDo.toJSON()
        }
    } else {
        if (text == null) {
            ctx.throw(400, "ToDo text is not passed")
        } else if (typeof text === "string" && text.trim() === "") {
            ctx.throw(400, "ToDo text is empty")
        } else {
            ctx.throw(400, "ToDo text should be string")
        }
    }
}