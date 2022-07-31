const { body } = require("express-validator")
const UserService = require("../../../services/user.service")

const rules = [
    body("email")
        .trim()
        .notEmpty()
        .normalizeEmail()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage("Email is not valid")
        .custom(validateEmail),
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name can't be empty")
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters long"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password can't be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
]

async function validateEmail(value) {
    const user = await UserService.findByEmail(value)
    if (!user) {
        return true
    }

    throw new Error(`User with email ${value} already exists.`)
}

module.exports = rules
