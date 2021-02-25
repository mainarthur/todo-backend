//@ts-check

import ToDo from "../../models/ToDo"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function updateToDo(ctx) {
    const { request, state: { payload } } = ctx
    const { body } = request

    const { id: userId } = payload

    const {
        _id, text, done, position, lastUpdate, deleted
    } = body

    const toDo = await ToDo.findOne({
        userId,
        _id
    }).exec()

    if(toDo) {
        console.log(toDo.toJSON())
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
        console.log(toDo.toJSON())

        ctx.status = 200
        ctx.body = {
            status: true,
            result: toDo
        }

    } else {
        ctx.throw(400, "ToDo not found")
    }
}