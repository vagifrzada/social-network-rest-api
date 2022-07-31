const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function findByEmail(email) {
    return User.findOne({ email: email })
}

async function create(data) {
    const { email, name, password } = data
    const generatedSalt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, generatedSalt)
    const user = new User({
        email: email,
        name: name,
        password: hashedPassword,
        status: "active",
    })

    return await user.save()
}

async function auth(email, password) {
    const user = await findByEmail(email)
    if (!user) {
        throw new Error("User not found")
    }

    const loginAttempt = await bcrypt.compare(password, user.password)
    if (!loginAttempt) {
        throw new Error("Credentials are invalid")
    }

    // Create JWT token
    const jwtSecret = process.env.JWT_SECRET
    const token = await jwt.sign(
        {
            id: user._id.toString(),
            email: user.email,
        },
        jwtSecret,
        { algorithm: "HS256", expiresIn: "1h" }
    )

    return {
        token,
    }
}

module.exports = {
    findByEmail,
    create,
    auth,
}
