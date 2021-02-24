//@ts-check
import Router from "@koa/router"
import koaJwt from "../../middlewares/jwt"
import getUser from "./getUser"

const router = new Router()

router.use(koaJwt)

router.get("/", getUser)

export default router