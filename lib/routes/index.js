//@ts-check
import Router from "@koa/router"
import userRouter from "./user"
import todoRouter from "./todo"
import authRouter from "./auth"

const router = new Router()

router.use("/user", userRouter.routes(), userRouter.allowedMethods())
router.use("/todo", todoRouter.routes(), todoRouter.allowedMethods())
router.use("/auth", authRouter.routes(), authRouter.allowedMethods())

export default router