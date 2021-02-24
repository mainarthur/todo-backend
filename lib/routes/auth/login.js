//@ts-check

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { isValidEmail, isValidPassword } from "../../utils.js"
import User from "../../models/User.js"
import dotenv from "dotenv"
import RefreshToken from "../../models/RefreshToken.js"
dotenv.config()

const { JWT_SECRET } = process.env

/**
 * @param {import("koa").ParameterizedContext<any, import("@koa/router").RouterParamContext<any, {}>, any>} ctx
 */
export default async function login(ctx) {
    const { request } = ctx
    const { body } = request
    
    let {
        email,
        password
    } = body

    email = email.trim()
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
    

    const user = await User.findOne({
        email
    }).exec()


    if(!user) {
        return ctx.throw(400, "User with this email haven't registred yet")
    }

    if(!bcrypt.compareSync(password, user.passwordHash)) {
        return ctx.throw(400, "Email or password is incorrect")
    }

    const token = new RefreshToken(user._id)
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

