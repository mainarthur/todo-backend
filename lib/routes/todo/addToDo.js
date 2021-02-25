//@ts-check
import ToDo from "../../models/ToDo.js"

/**
 * @param {import("koa").ParameterizedContext<any, import("@koa/router").RouterParamContext<any, {}>, any>} ctx
 */
export default async function addToDo(ctx) {
    const { request, state: { payload } } = ctx
    const { body } = request

    const { id: userId } = payload
    const { text } = body
    

    if (typeof text === "string" && text?.trim() !== "") {
        const toDo = new ToDo({
            text,
            userId
        })

        toDo.position = (await ToDo.findOne({userId}).sort('-LAST_MOD').exec() ?? { position: 0}).position + 1
        
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