//@ts-check
import koaJwt from "koa-jwt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const {
    JWT_SECRET
} = process.env


export default koaJwt({
    secret: JWT_SECRET,
    key: "payload"
})