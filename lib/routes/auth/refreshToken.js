import jwt from "jsonwebtoken"
import db from "../../db.js"
import dotenv from "dotenv"
import crypto from "crypto"
dotenv.config()

const { JWT_SECRET } = process.env

export default function refreshToken(req, res, body) {

}