//@ts-check
import Router from "@koa/router"
import userRouter from "./user"
import todoRouter from "./todo"

const router = new Router()

router.use("/user", userRouter.routes(), userRouter.allowedMethods())
router.use("/todo", todoRouter.routes(), todoRouter.allowedMethods())

export default router