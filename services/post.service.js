const path = require("path")
const fs = require("fs").promises
const Post = require("../models/post")
const paginator = require("../utils/paginator")

async function getOne(id) {
    const post = await Post.findById(id)
    if (!post) {
        const error = new Error(`Couldn't find post with id: ${id}`)
        error.status = 404
        throw error
    }
    return post
}

async function getAll(paginator) {
    return await Post.find()
        .sort({ createdAt: "desc" })
        .setOptions(paginator.options)
}

async function create(req) {
    const { title, content } = req.body

    try {
        const post = new Post({
            title,
            content,
            image: req.file.filename,
            creator: {
                name: "Vagif Rufullazada",
            },
        })
        return await post.save()
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function update(post, data) {
    const { title, content } = data
    const image = data.image?.filename

    try {
        post.title = title
        post.content = content

        if (image) {
            await deleteOldImage(post.image)
            post.image = image
        }
        return await post.save()
    } catch (err) {
        console.log("Error occurred on post update", err)
        throw err
    }
}

async function destroy(post) {
    try {
        await Post.deleteOne({ _id: post._id })
        await deleteOldImage(post.image)
        return true
    } catch (err) {
        console.log("Error occurred on post delete", err)
        throw err
    }
}

async function deleteOldImage(image) {
    const oldFilePath = path.join(
        path.dirname(require.main.filename),
        "storage",
        "public",
        "images",
        image
    )
    return fs.unlink(oldFilePath)
}

module.exports = {
    getOne,
    getAll,
    create,
    update,
    destroy,
}
