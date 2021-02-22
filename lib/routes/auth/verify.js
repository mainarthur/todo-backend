import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import HeaderNotFoundError from "../../errors/HeaderNotFoundError.js"
import InvalidHeaderValueError from "../../errors/InvalidHeaderValueError.js"
dotenv.config()

const { JWT_SECRET } = process.env

export default function verify(req, res, next = function () { }, body, args = []) {
    try {
        const { authorization } = req.headers

        if (typeof authorization != "string")
            throw new HeaderNotFoundError("authorization")

        if (authorization.indexOf("Bearer ") != 0)
            throw new InvalidHeaderValueError("authorization", authorization)


        const payload = jwt.verify(authorization.substring("Bearer ".length), JWT_SECRET)

        args.push(payload)
        args.unshift(res)
        args.unshift(req)
        next(...args)
    } catch (e) {

        if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.NotBeforeError) {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(401)
            res.write(JSON.stringify({
                status: false,
                error: "Invalid JWT"
            }))
            res.end()
        } else if (e instanceof jwt.TokenExpiredError) {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(401)
            res.write(JSON.stringify({
                status: false,
                error: "JWT is expired"
            }))
            res.end()
        } else if (e instanceof HeaderNotFoundError) {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(401)
            res.write(JSON.stringify({
                status: false,
                error: `${e.message} header is required`
            }))
            res.end()
        } else if (e instanceof InvalidHeaderValueError) {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(401)
            res.write(JSON.stringify({
                status: false,
                error: `Invalid header value: ${e.message}`
            }))
            res.end()
        } else {
            console.log(e)
        }

    }
}