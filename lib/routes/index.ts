import * as Router from "koa-router"
import todoRouter from "./todo"
import userRouter from "./user"
import authRouter from "./auth"

const router: Router = new Router()

router.use("/user", userRouter.routes(), userRouter.allowedMethods())
router.use("/todo", todoRouter.routes(), todoRouter.allowedMethods())
router.use("/auth", authRouter.routes(), authRouter.allowedMethods())



export default router