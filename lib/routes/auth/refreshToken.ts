//@ts-check
import { ParameterizedContext, Request } from "koa"
import * as Router from "koa-router"

import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

import RefreshToken from "../../models/RefreshToken"
import User from "../../models/User"

import RefreshTokenRequest from "../typings/RefreshTokenRequest"
dotenv.config()

const {
  JWT_SECRET
}: { [key: string]: string } = process.env

/**
 * @param {ParameterizedContext<any, IRouterParamContext<any, {}>, any>} ctx
 */
export default async function refreshToken(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
  const { request: { body } } = ctx

  const { refresh_token }: RefreshTokenRequest = body ?? { refresh_token: "" }

  const token = await RefreshToken.findOne({ token: refresh_token }).exec()

  if (!token) {
    return ctx.throw(400, "Refresh token not found")
  }

  if (token.isExpired() || token.revoked) {
    return ctx.throw(400, "Refresh token is not valid")
  }

  const user = await User.findOne({ _id: token.userId }).exec()

  if (!user) {
    return ctx.throw(400, "User not found")
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