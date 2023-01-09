const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect
const auth = require("../../../middlewares/auth")
const jwt = require("jsonwebtoken")
const UserService = require("../../../services/user.service")

describe("Auth middleware", () => {
    const res = {
        status: () => ({
            json: (data) => data,
        }),
    }

    it("should return error response if no 'Authorization' header passed", async () => {
        const req = {
            header: () => null,
        }
        const result = await auth(req, res, () => {})
        expect(result).has.property("message")
        expect(result.message).to.equal("Unauthorized.")
    })

    it("should return error response if token format is invalid passed through header", async () => {
        const req = {
            header: () => `xyz`, // Bearer {token}
        }
        const result = await auth(req, res, () => {})
        expect(result).has.property("message")
        expect(result.message).to.equal("Unauthorized.")
    })

    it("must append user object to the request object after successful token verification", async () => {
        const req = {
            header: () => "Bearer some-invalid-token-which-i-dont-care",
        }
        sinon.stub(jwt, "verify")
        jwt.verify.returns({
            id: "62e682485aaa439e9d26c344",
            email: "john@doe.com",
            iat: 1673281709,
            exp: 1673285309,
        })
        sinon.stub(UserService, "findByEmail")
        UserService.findByEmail.returns({
            id: "62e682485aaa439e9d26c344",
            email: "john@doe.com",
            createdAt: 1673281709,
        })
        await auth(req, res, () => {})
        expect(jwt.verify.called).to.be.true
        expect(UserService.findByEmail.called).to.be.true
        expect(req).to.have.property("user")
        expect(req.user).to.have.property("email")
        expect(req.user.email).to.be.equal("john@doe.com")

        jwt.verify.restore()
        UserService.findByEmail.restore()
    })
})
