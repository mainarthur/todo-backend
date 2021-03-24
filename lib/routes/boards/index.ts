//@ts-check
import * as  Router from "koa-router"
import koaJwt from "../../middlewares/jwt"
import getBoards from "./getBoards"
import createBoard from "./createBoard"
import deleteBoard from './deleteBoard'
import updateBoard from './updateBoard'
import addUser from './addUser'

const router: Router = new Router()

router.use(koaJwt)

router.get("/", getBoards)
router.post('/', createBoard)
router.delete('/', deleteBoard)
router.patch('/', updateBoard)
router.post('/user', addUser)

export default router