function register(app) {
    // Error handler
    app.use((err, req, res, next) => {
        if (!err) {
            return next()
        }

        return res
            .status(err.status || 400)
            .json({ message: `Oops error occurred. ${err.message}` })
    })
}

module.exports = {
    register,
}
