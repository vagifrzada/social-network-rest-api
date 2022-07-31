const express = require("express")
const cors = require("cors")
const path = require("path")

function register(app) {
    app.use(express.json()) // Accept application/json
    app.use(cors()) // Allow all origins

    // Configure public folder for static files
    app.use(express.static(path.join(__dirname, "..", "public")))
}

module.exports = {
    register,
}
