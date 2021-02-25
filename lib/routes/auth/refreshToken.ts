//@ts-check

import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import RefreshToken from "../../models/RefreshToken"
import User from "../../models/User"

dotenv.config()

const { JWT_SECRET } = process.env

/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function refreshToken(ctx) {
    const { request } = ctx
    const { body } = request

    const { refresh_token } = body

    const token = await RefreshToken.findOne({ token: refresh_token}).exec()

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

    // @ts-ignore
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