const jwt = require("jsonwebtoken")
const UserService = require("../services/user.service")

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        if (!authHeader) {
            throw new Error("No authorization header passed")
        }
        const token = authHeader.substring(7)
        const jwtSecret = process.env.JWT_SECRET
        const { email } = await jwt.verify(token, jwtSecret)
        const user = await UserService.findByEmail(email)
        if (!user) {
            throw new Error(`User not found with the email ${email}`)
        }
        req.user = user
        return next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Unauthorized." })
    }
}
