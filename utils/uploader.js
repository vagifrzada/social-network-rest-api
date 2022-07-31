const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(
            null,
            path.join(__dirname, "..", "storage", "public", "images")
        )
    },
    filename: (req, file, callback) => {
        const filename = uuidv4() + path.extname(file.originalname)
        callback(null, filename)
    },
})

const fileFilter = (req, file, callback) => {
    const allowedExtensions = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
    ]
    const mimeType = file.mimetype
    if (!allowedExtensions.includes(mimeType)) {
        return callback(new Error(`Unsupported file type: ${mimeType}`))
    }

    callback(null, true)
}

function getUploadDriver() {
    return multer({
        storage,
        fileFilter,
    })
}

module.exports = {
    getUploadDriver,
}
