const express = require("express")
const router = express.Router()
const { validate } = require("../utils/validator")

const authController = require("../controllers/authController")

const authValidationSignUpSchema = require("../schema/validation/auth/signup")
const authValdationSignInSchema = require("../schema/validation/auth/signin")

router.post(
    "/signup",
    validate(authValidationSignUpSchema),
    authController.signUp
)
router.post(
    "/signin",
    validate(authValdationSignInSchema),
    authController.signIn
)

module.exports = router
