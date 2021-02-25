//@ts-check
import { ParameterizedContext } from "koa"
import * as Router from "koa-router"
import * as  bcrypt from "bcrypt"
import * as  jwt from "jsonwebtoken"
import { isValidEmail, isValidPassword } from "../../utils"
import User, { UserDocument } from "../../models/User"
import * as dotenv from "dotenv"
import RefreshToken from "../../models/RefreshToken"
import LoginRequest from "../requests/LoginRequest"
dotenv.config()

const { JWT_SECRET } = process.env

/**
 * @param {Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>} ctx
 */
export default async function login(ctx:ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>): Promise<void> {
    const request = ctx.request
    const body: LoginRequest = request.body

    let {
        email,
        password
    } = body

    email = email.trim().toLowerCase()
    password = password.trim()

    if(email === "") {
        return ctx.throw(400, "Email is required!")
    }

    if(!isValidEmail(email)) {
        return ctx.throw(400, "Email is invalid!")
    }

    if(password == "") {
        return ctx.throw(400, "Password is required!")
    }

    if(!isValidPassword(password)) {
        return ctx.throw(400, "Password is invalid!")
    }
    

    const user:UserDocument = await User.findOne({
        email
    }).exec()


    if(!user) {
        return ctx.throw(400, "User with this email haven't registred yet")
    }

    if(!bcrypt.compareSync(password, user.passwordHash)) {
        return ctx.throw(400, "Email or password is incorrect")
    }

    const token = new RefreshToken({userId: user._id})
    await token.save()


    ctx.status = 200
    ctx.body = {
        status: true,
        access_token: jwt.sign({
            id: user.id
        }, JWT_SECRET, {
            expiresIn: "10m"
        }),
        refresh_token: token.token,
    }
} 

