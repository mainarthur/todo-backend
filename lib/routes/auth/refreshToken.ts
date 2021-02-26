//@ts-check

import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import RefreshToken, { RefreshTokenDocument } from "../../models/RefreshToken"
import User from "../../models/User"
import { ParameterizedContext, Request } from "koa"
import * as Router from "koa-router"
import RefreshTokenRequest from "../requests/RefreshTokenRequest"

dotenv.config()

const {
    JWT_SECRET
} : { [key: string]: string }= process.env

/**
 * @param {ParameterizedContext<any, IRouterParamContext<any, {}>, any>} ctx
 */
export default async function refreshToken(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
    const { request }: { request: Request } = ctx
    const { body }: { body?: RefreshTokenRequest } = request

    const { refresh_token }: { refresh_token: string } = body ?? { refresh_token: "" }

    const token: RefreshTokenDocument = await RefreshToken.findOne({ token: refresh_token}).exec()

    if(!token) {
        return ctx.throw(401, "Refresh token not found")
    }

    if(token.isExpired() || token.revoked) {
        return ctx.throw(401, "Refresh token is not valid")
    }

    const user = await User.findOne({ _id: token.userId }).exec()

    if(!user) {
        return ctx.throw(401, "User not found")
    }

    token.token = RefreshToken.generateRefreshToken()

    await token.save()

    ctx.status = 200
    ctx.body = {
        status: true,
        access_token: jwt.sign({
            id: user.id
        }, JWT_SECRET, {
            expiresIn: "10m"
        }),
        refresh_token: token.token
    }
}