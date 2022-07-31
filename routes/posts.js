const express = require("express")
const router = express.Router()
const { validate } = require("../utils/validator")
const { getUploadDriver } = require("../utils/uploader")

// Controllers
const postsController = require("../controllers/postsController")

// Validation schemas
const postsValidationSchema = require("../schema/validation/posts")

// Routes
router.get("/posts", postsController.index)
router.post(
    "/posts",
    getUploadDriver().single("image"),
    validate(postsValidationSchema),
    postsController.store
)
router.get("/posts/:id", postsController.show)
router.put(
    "/posts/:id",
    getUploadDriver().single("image"),
    validate(postsValidationSchema),
    postsController.update
)
router.delete("/posts/:id", postsController.destroy)

module.exports = router
