import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const { JWT_SECRET } = process.env

export default function verify(req, res, next = function () { }, ...rest) {
    try {
        const { authorization } = req.headers

        if (typeof authorization != "string")
            throw new Error(typeof authorization)

        if (authorization.indexOf("Bearer ") != 0)
            throw new Error(authorization)


        const payload = jwt.verify(authorization.substring("Bearer ".length), JWT_SECRET)

        rest.push(payload)
        rest.unshift(res)
        rest.unshift(req)
        next(...rest)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError || e instanceof jwt.NotBeforeError) {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(401)
            res.end()
        } else {
            console.log(e)
        }
    }
}