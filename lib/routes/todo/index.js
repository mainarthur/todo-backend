//@ts-check
import Router from "@koa/router"
import koaJwt from  "../../middlewares/jwt"

import getToDo from "./getToDo"
import getAllToDos from "./getAllToDos"
import deleteToDo from "./deleteToDo"
import addToDo from "./addToDo"
import updateToDo from "./updateToDo"


const router = new Router()

router.use(koaJwt)

router.get("/", getAllToDos)

router.get("/:id", getToDo)

router.post("/", addToDo)

router.delete("/:id", deleteToDo)

router.patch("/", updateToDo)

export default router