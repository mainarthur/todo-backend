//@ts-check

import ToDo from "../../models/ToDo"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteToDo(ctx) {
    const { state: { payload }, params: { id: _id } } = ctx

    const { id: userId } = payload

    const toDo = await ToDo.findOne({
        _id,
        userId
    }).exec()

    if(toDo) {
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