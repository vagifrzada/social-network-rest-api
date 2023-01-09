const chai = require("chai")
const expect = chai.expect

describe("Starter test", () => {
    it("should be equal to 5", () => {
        const firstNumber = 2
        const secondNumber = 3

        expect(firstNumber + secondNumber).to.equal(5)
    })

    it("shouldn't be equal to 5", () => {
        const x = 3
        const y = 3
        expect(x + y).not.to.equal(5)
    })
})
