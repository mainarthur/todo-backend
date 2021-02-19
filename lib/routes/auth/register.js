import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../../db.js"
import { isValidEmail, isValidPassword, isValidName } from "../../utils.js"
import User from "../../models/User.js"
import dotenv from "dotenv"
import crypto from "crypto"
dotenv.config()

const { JWT_SECRET } = process.env


export default function registerUser(req, res, body) {
    let {
        email,
        name,
        password
    } = body

    email = email.trim()
    name = name.trim()
    password = password.trim()

    if(email === "") {
        return reject(req, res, "Email is required!")
    }

    if(!isValidEmail(email)) {
        return reject(req, res, "Email is invalid!")
    }

    if(name === "") {
        return reject(req, res, "Name is required!")
    }

    if(!isValidName(name)) {
        return reject(req, res, "Name is invalid!")
    }

    if(password == "") {
        return reject(req, res, "Password is required!")
    }

    if(!isValidPassword(password)) {
        return reject(req, res, "Password is too weak!")
    }
    
    if(db.users.find(user => user.email == email)) {
        return reject(req, res, "User with this email already have registred")
    }
 
    const user = new User(name, email, bcrypt.hashSync(password, 10))
    user.refreshToken = crypto.randomBytes(256).toString("hex")

    db.users.push(user)

    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.write(JSON.stringify({
        status: true,
        access_token: jwt.sign({
            id: user.id
        }, JWT_SECRET, {
            expiresIn: "10m"
        }),
        refresh_token: user.refreshToken
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