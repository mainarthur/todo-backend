//@ts-check
import * as  Router from "koa-router"
import koaJwt from "../../middlewares/jwt"
import getBoards from "./getBoards"
import createBoard from "./createBoard"
import deleteBoard from './deleteBoard'
import updateBoard from './updaetBoard'

const router: Router = new Router()

router.use(koaJwt)

router.get("/", getBoards)
router.post('/', createBoard)
router.delete('/', deleteBoard)
router.patch('/', updateBoard)

export default router