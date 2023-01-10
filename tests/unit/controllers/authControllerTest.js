const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect
const mongoose = require("mongoose")
const authController = require("../../../controllers/authController")
const UserService = require("../../../services/user.service")
const User = require("../../../models/user")

describe("AuthController test", () => {
    const res = {
        statusCode: 500,
        status: function (code) {
            this.statusCode = code
            return this
        },
        json: function (data) {
            return data
        },
    }

    before(async () => {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to test MongoDB cluster")
    })

    it("should be able to register new user", async () => {
        const req = {
            body: {
                email: "john@doe.com",
                name: "John Doe",
                password: "secret",
            },
        }

        const result = await authController.signUp(req, res)
        expect(result).to.have.property("message", "Successfully signed up")
        expect(result).to.have.property("data")
        expect(result.data).to.have.property("email")
        expect(result.data.email).to.be.equal(req.body.email)
    })

    it("should return token after sign in", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "secret",
            },
        }
        sinon.stub(UserService, "auth")
        UserService.auth.returns({
            token: "xyz",
        })

        const result = await authController.signIn(req, res)
        expect(result).to.have.property("token")
        UserService.auth.restore()
    })

    after(async () => {
        // Cleanup
        await User.deleteMany()
        await mongoose.disconnect()
        console.log("Disconnected from database")
    })
})
