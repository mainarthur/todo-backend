//@ts-check
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { isValidEmail, isValidPassword, isValidName } from "../../utils.js"
import User from "../../models/User.js"
import dotenv from "dotenv"
import RefreshToken from "../../models/RefreshToken.js"
dotenv.config()

const { JWT_SECRET } = process.env


/**
 * @param {import("koa").ParameterizedContext<any, import("koa-router").IRouterParamContext<any, {}>, any>} ctx
 */
export default async function registerUser(ctx) {
    const { request } = ctx
    const { body } = request
    

    let {
        email,
        name,
        password
    } = body

    email = email.trim()
    name = name.trim()
    password = password.trim()

    if (email === "") {
        return ctx.throw(400, "Email is required")
    }

    if (!isValidEmail(email)) {
        return ctx.throw(400, "Email is invalid!")
    }

    if (name === "") {
        return ctx.throw(400, "Name is required!")
    }

    if (!isValidName(name)) {
        return ctx.throw(400, "Name is invalid!")
    }

    if (password == "") {
        return ctx.throw(400, "Password is required!")
    }

    if (!isValidPassword(password)) {
        return ctx.throw(400, "Password is too weak!")
    }

    if ((await User.find({ email }).exec()).length > 0) {
        return ctx.throw(400, "User with this email already have registred")
    }

    const user = new User({
        name,
        email,
        passwordHash: bcrypt.hashSync(password, 10)
    })

    await user.save()

    const token = new RefreshToken({
        userId: user._id
    })
    await token.save()

    
    ctx.status = 200
    ctx.body = {
        status: true,
        access_token: jwt.sign({
            id: user._id
        }, JWT_SECRET, {
            expiresIn: "10m"
        }),
        refresh_token: token.token
    }
}
