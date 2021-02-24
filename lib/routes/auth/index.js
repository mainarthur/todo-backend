//@ts-check
import Router from "@koa/router"
import login from "./login"
import register from "./register"
import refreshToken from "./refreshToken"

const router = new Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshToken)

export default router