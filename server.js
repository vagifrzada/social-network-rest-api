const app = require("express")()
const mongoose = require("mongoose")
require("./bootstrap")(app)

const PORT = process.env.PORT || 3000

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, console.log(`App is running on port ${PORT}`))
    })
    .catch((err) => console.log(err))
