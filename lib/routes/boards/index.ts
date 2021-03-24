//@ts-check
import * as  Router from "koa-router"
import koaJwt from "../../middlewares/jwt"
import getBoards from "./getBoards"
import createBoard from "./createBoard"
import deleteBoard from './deleteBoard'

const router: Router = new Router()

router.use(koaJwt)

router.get("/", getBoards)
router.post('/', createBoard)
router.delete('/', deleteBoard)

export default router