const UserService = require("../services/user.service")

async function signUp(req, res, next) {
    try {
        const user = await UserService.create(req.body)
        return res.status(201).json({
            message: "Successfully signed up",
            data: user.transform(),
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: err.message,
        })
    }
}

async function signIn(req, res, next) {
    try {
        const { email, password } = req.body
        const result = await UserService.auth(email, password)
        return res.status(200).json({
            token: result.token,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: err.message,
        })
    }
}

module.exports = {
    signUp,
    signIn,
}
