const { validationResult } = require("express-validator")

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req))) // Paralel/declarative

        // for (let validation of validations) { // Imperative way
        //     const result = await validation.run(req)
        //     if (result.errors.length) break
        // }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        return res.status(400).json({
            errors: errors.array().map((error) => ({
                field: error.param,
                message: error.msg,
            })),
        })
    }
}

module.exports = {
    validate,
}
