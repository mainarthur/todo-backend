//@ts-check
import * as  Router from "koa-router"
import koaJwt from "../../middlewares/jwt"
import addFirebaseToken from './addFirebaseToken'
import getUser from "./getUser"

const router: Router = new Router()

router.use(koaJwt)

router.get("/", getUser)
router.post('/firebase', addFirebaseToken)

export default router