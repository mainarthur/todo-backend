//@ts-check
import Router from "@koa/router"
import koaJwt from  "../../middlewares/jwt"

const router = new Router()

router.use(koaJwt)

router.get("/", async (ctx) => {
    const { payload } = ctx.state

    
})

export default router