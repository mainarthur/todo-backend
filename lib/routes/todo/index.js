//@ts-check
import Router from "@koa/router"
import koaJwt from  "../../middlewares/jwt"

const router = new Router()

router.use(koaJwt)

router.get("/", async (ctx) => {
    
})

router.get("/:id", async (ctx) => {
    
})

router.post("/", async (ctx) => {
    
})

router.delete("/", async (ctx) => {
    
})

router.patch("/", async (ctx) => {
    
})

export default router