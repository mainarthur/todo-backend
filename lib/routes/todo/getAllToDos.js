//@ts-check

import ToDo from "../../models/ToDo"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getAllToDos(ctx) {
    const { state: { payload }, URL } = ctx
    const { id: userId } = payload

    const from = parseInt(URL.searchParams.get("from"))

    
    if(isNaN(from)) {
        ctx.status = 200
        ctx.body = {
            status: true,
            results: await ToDo.find({ userId }).exec()
        }
    } else {
        ctx.status = 200
        ctx.body = {
            status: true,
            results: await ToDo.find({
                userId,
                lastUpdate: {
                    $gt: from
                }
            }).exec()
        }
    }
    
}