//@ts-check
import * as  bcrypt from "bcrypt"
import * as  jwt from "jsonwebtoken"
import { isValidEmail, isValidPassword, isValidName } from "../../utils"
import User, { UserDocument } from "../../models/User"
import * as dotenv from "dotenv"
import RefreshToken, { RefreshTokenDocument } from "../../models/RefreshToken"
import { ParameterizedContext, Request } from "koa"
import { IRouterParamContext } from "koa-router"
import RegisterRequest from "../requests/RegisterRequet"
dotenv.config()

const { JWT_SECRET } = process.env


/**
 * @param {ParameterizedContext<any, IRouterParamContext<any, {}>, any>} ctx
 */
export default async function registerUser(ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>): Promise<void> {
    const { request }: { request: Request } = ctx
    const { body }: { body?: RegisterRequest } = request

    let {
        email,
        name,
        password
    } = body ?? { email: "", password: "", name: ""}

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

    const user: UserDocument = new User({
        name,
        email,
        passwordHash: bcrypt.hashSync(password, 10)
    })

    await user.save()

    const token: RefreshTokenDocument = new RefreshToken({
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
