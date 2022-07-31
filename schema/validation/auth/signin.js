const { body } = require("express-validator")
const UserService = require("../../../services/user.service")

const rules = [
    body("email")
        .trim()
        .notEmpty()
        .normalizeEmail()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage("Email is not valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password can't be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
]

module.exports = rules
