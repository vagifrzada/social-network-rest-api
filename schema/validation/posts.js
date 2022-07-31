const { body } = require("express-validator")

const rules = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title can't be empty")
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long"),

    body("content")
        .notEmpty()
        .withMessage("Content can't be empty")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long"),

    body("image").custom((_, { req }) => {
        const isUpdating = req.params?.id !== undefined
        if (!isUpdating && !req.file) {
            throw new Error("Image is required")
        }

        return true
    }),
]

module.exports = rules
