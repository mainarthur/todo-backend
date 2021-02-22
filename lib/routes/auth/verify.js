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
        res.setHeader("Content-Type", "application/json")
        res.writeHead(401)
        if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.NotBeforeError) {
            res.write(JSON.stringify({
                status: false,
                error: "Invalid JWT"
            }))
        } else if( e instanceof jwt.TokenExpiredError){
            
            res.write(JSON.stringify({
                status: false,
                error: "JWT is expired"
            }))
        } else if(e instanceof HeaderNotFoundError) {
            res.write(JSON.stringify({
                status: false,
                error: `${e.message} header is required`
            }))
        } else if(e instanceof InvalidHeaderValueError) {
            res.write(JSON.stringify({
                status: false,
                error: `Invalid header value: ${e.message}`
            }))
        } else {
            console.log(e)
            res.write(JSON.stringify({
                status: false
            }))
        }

        res.end()
    }
}