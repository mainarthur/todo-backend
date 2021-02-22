import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../../db.js"
import { isValidEmail, isValidPassword } from "../../utils.js"
import User from "../../models/User.js"
import dotenv from "dotenv"
import RefreshToken from "../../models/RefreshToken.js"
dotenv.config()

const { JWT_SECRET } = process.env


export default function registerUser(req, res, body) {
    let {
        email,
        password
    } = body

    email = email.trim()
    password = password.trim()

    if(email === "") {
        return reject(req, res, "Email is required!")
    }

    if(!isValidEmail(email)) {
        return reject(req, res, "Email is invalid!")
    }

    if(password == "") {
        return reject(req, res, "Password is required!")
    }

    if(!isValidPassword(password)) {
        return reject(req, res, "Password is invalid!")
    }
    

    const user = db.users.find(user => user.email == email)
    const token = new RefreshToken(user.id)

    db.refreshTokens.push(token)

    if(!user) {
        return reject(req, res, "User with this email haven't registred yet")
    }



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

function reject(req, res, errorText) {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(400)
    res.write(JSON.stringify({
        status: false,
        error: errorText
    }))
    res.end()
}