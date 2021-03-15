//@ts-check
import * as Router from "koa-router"
import koaJwt from  "../../middlewares/jwt"

import getToDo from "./getToDo"
import getAllToDos from "./getAllToDos"
import deleteToDo from "./deleteToDo"
import addToDo from "./addToDo"
import updateToDo from "./updateToDo"
import deleteAllToDos from './deleteAllToDos'


const router: Router = new Router()


router.use(koaJwt)
router.get("/", getAllToDos)
router.get("/:id", getToDo)
router.post("/", addToDo)
router.delete("/:id", deleteToDo)
router.delete("/", deleteAllToDos)
router.patch("/", updateToDo)


export default router