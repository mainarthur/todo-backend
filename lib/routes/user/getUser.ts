//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import { UserPayload } from "../auth/UserPayload"
import User from "../../models/User"
import { ObjectId } from "mongoose"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getUser(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { state: { payload } } = ctx
    const { id: userId }: UserPayload = payload

    const user = await User.findById(userId)

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