//@ts-check

import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import ToDo from "../../models/ToDo"
import { UserPayload } from "../auth/UserPayload"
import { Schema } from "mongoose"

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function getAllToDos(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { state: { payload }, URL }: { state: { payload: UserPayload }, URL: URL } = ctx
    const { id: userId }: { id: string } = payload

    const from: number = parseInt(URL.searchParams.get("from"))


    if (isNaN(from)) {
        ctx.status = 200
        ctx.body = {
            status: true,
            results: await ToDo.find({ userId: new Schema.Types.ObjectId(userId) }).exec()
        }
    } else {
        ctx.status = 200
        ctx.body = {
            status: true,
            results: await ToDo.find({
                userId: new Schema.Types.ObjectId(userId),
                lastUpdate: {
                    $gt: from
                }
            }).exec()
        }
    }

}