const postsRoutes = require("../routes/posts")
const authRoutes = require("../routes/auth")

const auth = require("../middlewares/auth")

function register(app) {
    app.use("/auth", authRoutes)
    app.use("/api", auth, postsRoutes)
}

module.exports = {
    register,
}
