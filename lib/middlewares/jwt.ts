//@ts-check
import * as koaJwt from "koa-jwt"
import * as dotenv from "dotenv"

dotenv.config()

const {
  JWT_SECRET
}: { [key: string]: string } = process.env


export default koaJwt({
  secret: JWT_SECRET,
  key: "payload"
})