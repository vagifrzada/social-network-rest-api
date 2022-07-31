const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "inactive",
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true }
)

userSchema.methods.transform = function () {
    return {
        name: this.name,
        email: this.email,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

userSchema.methods.removePost = async function (post) {
    this.posts.pull(post._id)
    await this.save()
}

module.exports = mongoose.model("User", userSchema)
