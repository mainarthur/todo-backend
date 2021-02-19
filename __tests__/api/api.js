const frisby = require("frisby")
const { Joi } = frisby

const link = (endpoint) => `http://api.todolist.local/${endpoint}`


describe("ToDos", function () {
    it(`GET ${link("todo/all")}`, function () {
        return frisby.get(link("todo/all"))
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("jsonTypes", {
                status: Joi.boolean(),
                results: Joi.array()
            })
    })

    it(`POST ${link("todo")}`, function () {
        return frisby.post(link("todo"), {
            text: "new todo"
        })
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("json", "result", {
                text: "new todo"
            })
    })

    it(`POST ${link("todo")} and check result with GET ${link("todo/all")}`, function () {
        return frisby.post(link("todo"), {
            text: "new todo"
        })
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("json", "result", {
                text: "new todo"
            }).then((newTodo) => {
                let id = newTodo.json.result.id
                return frisby.get(link("todo/all"))
                    .expect("status", 200)
                    .expect('header', 'Content-Type', 'application/json')
                    .expect("jsonTypes", {
                        status: Joi.boolean(),
                        results: Joi.array()
                    }).then((todos) => {
                        expect(todos.json.results.find((todo) => todo.id == id)).toBeDefined()
                    })
            })
    })

    it(`POST ${link("todo")} and check result with GET ${link("todo")}`, function () {
        return frisby.post(link("todo"), {
            text: "new todo"
        })
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("json", "result", {
                text: "new todo"
            }).then((newTodo) => {
                let id = newTodo.json.result.id
                return frisby.get(link(`todo?id=${id}`))
                    .expect("status", 200)
                    .expect('header', 'Content-Type', 'application/json')
                    .expect("json", newTodo.json)
            })
    })

    it(`DELETE ${link("todo")}`, function() {
        return frisby.post(link("todo"), {
            text: "new todo"
        })
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("json", "result", {
                text: "new todo"
            }).then((newTodo) => {
                let id = newTodo.json.result.id
                return frisby.get(link("todo/all"))
                    .expect("status", 200)
                    .expect('header', 'Content-Type', 'application/json')
                    .expect("jsonTypes", {
                        status: Joi.boolean(),
                        results: Joi.array()
                    }).then((todos) => {
                        expect(todos.json.results.find((todo) => todo.id == id)).toBeDefined()

                        return frisby.del(link(`todo?id=${id}`))
                            .expect("status", 200)
                            .expect('header', 'Content-Type', 'application/json')
                            .expect("jsonTypes", {
                                status: Joi.boolean(),
                                results: Joi.array()
                            }).then((deletedToDo) => {
                                let deletedToDoId = deletedToDo.json.results[0].id
                                expect(deletedToDoId).toEqual(id)

                                return frisby.get(link("todo/all"))
                                .expect("status", 200)
                                .expect('header', 'Content-Type', 'application/json')
                                .expect("jsonTypes", {
                                    status: Joi.boolean(),
                                    results: Joi.array()
                                }).then((todos) => {
                                    expect(todos.json.results.find((todo) => todo.id == id)).toBeUndefined()
                                })
                            })

                    })
            })
    })

    it(`PATCH ${link("todo")}`, function() {
        return frisby.post(link("todo"), {
            text: "new todo"
        })
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("json", "result", {
                text: "new todo"
            }).then((newTodo) => {
                let id = newTodo.json.result.id
                return frisby.get(link("todo/all"))
                    .expect("status", 200)
                    .expect('header', 'Content-Type', 'application/json')
                    .expect("jsonTypes", {
                        status: Joi.boolean(),
                        results: Joi.array()
                    }).then((todos) => {
                        expect(todos.json.results.find((todo) => todo.id == id)).toBeDefined()

                        return frisby.patch(link(`todo`), {
                            id,
                            text: "updated text"
                        })
                            .expect("status", 200)
                            .expect('header', 'Content-Type', 'application/json')
                            .expect("json", {
                                status: true,
                                result: {
                                    id,
                                    text: "updated text"
                                }
                            }).then((updatedToDo) => {
                                let updatedToDoId = updatedToDo.json.result.id
                                expect(updatedToDoId).toEqual(id)

                                return frisby.get(link("todo/all"))
                                .expect("status", 200)
                                .expect('header', 'Content-Type', 'application/json')
                                .expect("jsonTypes", {
                                    status: Joi.boolean(),
                                    results: Joi.array()
                                }).then((todos) => {
                                    expect(todos.json.results.find((todo) => todo.id == id && todo.text == "updated text")).toBeDefined()
                                })
                            })

                    })
            })
    })
})

describe("Auth", function() {
    it(`POST ${link("auth/register")}`, function() {
        return frisby.post(link("auth/register"), {
            name: "Name", 
            password: "Pass",
            email: "e@ma.il"
        })
            .expect("status", 200)
            .then(res => console.log(res.json))
    })
})