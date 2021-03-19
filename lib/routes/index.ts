import * as Router from "koa-router"
import todoRouter from "./todo"
import userRouter from "./user"
import authRouter from "./auth"
import boardsRouter from "./boards"

const router: Router = new Router()

router.use("/user", userRouter.routes(), userRouter.allowedMethods())
router.use("/todo", todoRouter.routes(), todoRouter.allowedMethods())
router.use("/auth", authRouter.routes(), authRouter.allowedMethods())
router.use('/board', boardsRouter.routes(), boardsRouter.allowedMethods())

router.options('/socket.io', async (ctx) => {
  ctx.status = 200
})

export default router