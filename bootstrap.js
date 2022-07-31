require("dotenv").config()
const path = require("path")
// const fs = require("fs/promises")

const providers = ["app", "routes", "error"]

module.exports = (app) => {
    const providersDir = path.join(__dirname, "providers")
    // const files = await fs.readdir(providersDir)
    return providers.reduce((appInstance, file) => {
        const provider = require(path.join(providersDir, `${file}.provider`))
        provider.register(appInstance)
        return appInstance
    }, app)
}
