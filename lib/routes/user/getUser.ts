//@ts-check

import User from "../../models/User"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getUser(ctx) {
    const { payload } = ctx.state
    const { id } = payload

    const user = await User.findById(id)

    if (user) {
        const { passwordHash, __v, ...result } = user.toJSON()

        ctx.status = 200
        ctx.body = {
            status: true,
            result
        }
    } else {
        ctx.throw(400, "User not found")
    }
}