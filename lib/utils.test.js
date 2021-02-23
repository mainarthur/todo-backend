import { isValidEmail, isValidPassword, isValidName} from "./utils.js"


describe("Password validation", () => {
    

    it("only lowercase", () => {
        expect(isValidPassword("qwertyuiopasdfgh")).toBeFalsy()
    })

    it("only uppercase", () => {
        expect(isValidPassword("QWERTYUIOAPSADBHJSC")).toBeFalsy()
    })

    it("only numbers", () => {
        expect(isValidPassword("1234567890")).toBeFalsy()
    })

    it("only special", () => {
        expect(isValidPassword("!@#$%^&*(){}|\\")).toBeFalsy()
    })

    it("length is less than 8", () => {
        expect(isValidPassword("123")).toBeFalsy()
    })

    it("length is 8", () => {
        expect(isValidPassword("1qW$5678")).toBeTruthy()
    })

    it("length is 255", () => {
        expect(isValidPassword("1qW$56781111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111")).toBeTruthy()
    })

    it("length is more than 255", () => {
        expect(isValidPassword("1qW$56781111111111111111111111111111111111321111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111")).toBeFalsy()
    })

    it("only lower and upper", () => {
        expect(isValidPassword("qwertyuiopasdfghQWERTYUIOAPSADBHJSC")).toBeFalsy()
    })

    it("normal length with mix of all types", () => {
        
        expect(isValidPassword("pa123@#WEEDssWORD123!@#")).toBeTruthy()
    })
})