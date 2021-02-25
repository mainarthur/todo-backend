//@ts-check

import ToDo from "../../models/ToDo"

/**
 * @param {import("koa").ParameterizedContext<any, import("@koa/router").RouterParamContext<any, {}>, any>} ctx
 */
export default async function getToDo(ctx) {
    const { state: { payload }, params: { id: _id } } = ctx

    const { id: userId } = payload

    const toDo = await ToDo.findOne({
        _id,
        userId
    }).exec()

    if(toDo) {
        ctx.status = 200
        ctx.body = {
            status: true,
            result: toDo
        }
    } else {
        ctx.throw(400, "ToDo not found")
    }
}