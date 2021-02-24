import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const { JWT_SECRET } = process.env

export default function refreshToken(req, res, body) {
    const {
        refresh_token: refreshToken
    } = body

    const token = db.refreshTokens.find(r => r.token == refreshToken)

    if(!token) {
        res.setHeader("Content-Type", "application/json")
        res.writeHead(401)
        res.write(JSON.stringify({
            status: false,
            error: "Refresh token not found"
        }))
        res.end()
        return
    }

    if(token.isExpired() || token.revoked) {
        res.setHeader("Content-Type", "application/json")
        res.writeHead(401)
        res.write(JSON.stringify({
            status: false,
            error: "Refresh token is expired"
        }))
        res.end()
        return
    }

    const user = db.users.find(u => u.id == token.userId)

    if(!user) {
        res.setHeader("Content-Type", "application/json")
        res.writeHead(401)
        res.write(JSON.stringify({
            status: false,
            error: "User with this refresh token not found"
        }))
        res.end()
        return
    }

    token.update()

    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.write(JSON.stringify({
        status: true,
        access_token: jwt.sign({
            id: user.id
        }, JWT_SECRET, {
            expiresIn: "10m"
        }),
        refresh_token: token.toString()
    }))
    res.end()
}