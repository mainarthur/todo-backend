const frisby = require("frisby")
const { Joi } = frisby

const link = (endpoint) => `http://api.todolist.local/${endpoint}`


describe("Auth", function () {

    let access_token, refresh_token;

    const user = {
        password: Array(30).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}*()!@#$%^&*_-+=").map((x) => { 
            return x[Math.floor(Math.random() * x.length)]
        }).join(''),
        name: "username",
        email: `${Array(30).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map((x) => { 
            return x[Math.floor(Math.random() * x.length)]
        }).join('')}@email.com`
    }
    


    it(`POST ${link("auth/register")}`, function () {
        return frisby.post(link("auth/register"), user).expect("jsonTypesStrict", {
            status: Joi.boolean(),
            access_token: Joi.string(),
            refresh_token: Joi.string()
        }).then(res => {
            access_token = res.json.access_token
            refresh_token = res.json.refresh_token

            frisby.globalSetup({
                request: {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }
                }
            })
        })
    })

    
    it(`POST ${link("auth/login")}`, function () {
        return frisby.post(link("auth/login"), user).expect("jsonTypesStrict", {
            status: Joi.boolean(),
            access_token: Joi.string(),
            refresh_token: Joi.string()
        }).then(res => {
            access_token = res.json.access_token
            refresh_token = res.json.refresh_token

            frisby.globalSetup({
                request: {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }
                }
            })
        })
    })


    const prevRefreshToken = refresh_token
    const prevAccessToken = access_token

    it(`POST ${link("auth/refresh-token")}`, () => {
        return frisby.post(link("auth/refresh-token"), {
            refresh_token: refresh_token
        }).expect("status", 200)
        .expect("jsonTypesStrict", {
            status: Joi.boolean(),
            access_token: Joi.string(),
            refresh_token: Joi.string()
        }).then(res => {
            access_token = res.json.access_token
            refresh_token = res.json.refresh_token

            frisby.globalSetup({
                request: {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }
                }
            })
        })

    })

    it("Access token and refresh token changed", () => {
        expect(access_token).not.toBe(prevAccessToken)
        expect(refresh_token).not.toBe(prevRefreshToken)
    })


})

describe("ToDos", function () {


    it(`GET ${link("todo/all")}`, function () {
        return frisby.get(link("todo/all"))
            .expect("status", 200)
            .expect('header', 'Content-Type', 'application/json')
            .expect("jsonTypesStrict", {
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
                    .expect("jsonTypesStrict", {
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

    it(`DELETE ${link("todo")}`, function () {
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
                    .expect("jsonTypesStrict", {
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
                                    .expect("jsonTypesStrict", {
                                        status: Joi.boolean(),
                                        results: Joi.array()
                                    }).then((todos) => {
                                        expect(todos.json.results.find((todo) => todo.id == id)).toBeUndefined()
                                    })
                            })

                    })
            })
    })

    it(`PATCH ${link("todo")}`, function () {
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
                    .expect("jsonTypesStrict", {
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
                                    .expect("jsonTypesStrict", {
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
