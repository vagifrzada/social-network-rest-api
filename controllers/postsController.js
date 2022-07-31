const PostService = require("../services/post.service")
const Post = require("../models/post")
const paginator = require("../utils/paginator")

async function index(req, res, next) {
    try {
        const result = paginator.paginate({
            page: req.query.page || 1,
            perPage: 2,
            totalItems: await Post.count(),
        })
        const posts = await PostService.getAll(result)
        return res.status(200).json({
            data: posts,
            paginator: result,
        })
    } catch (err) {
        console.log(err)
        return res.status(503).json({
            data: [],
        })
    }
}

async function show(req, res, next) {
    try {
        const post = await PostService.getOne(req.params.id)
        return res.status(200).json({
            message: "Successfully retrieved post object",
            data: post,
        })
    } catch (err) {
        console.log(err)
        return res.status(err.status || 400).json({
            data: {},
        })
    }
}

async function store(req, res, next) {
    try {
        const createdPost = await PostService.create(req)
        return res.status(201).json({
            message: "Post created successfully",
            data: createdPost,
        })
    } catch (err) {
        console.log(err)
        return res.status(503).json({
            message: err.message,
        })
    }
}

async function update(req, res, next) {
    try {
        const user = req.user
        const post = await PostService.getOne(req.params.id)
        if (!checkAuthor(user, post)) {
            return res.status(403).json({ message: "Forbidden action" })
        }
        const updatedPost = await PostService.update(post, {
            ...req.body,
            image: req.file,
        })
        return res.status(200).json({
            message: "Post updated successfully",
            data: updatedPost,
        })
    } catch (err) {
        console.log(err)
        return res.status(503).json({
            message: err.message,
        })
    }
}

async function destroy(req, res, next) {
    try {
        const user = req.user
        const post = await PostService.getOne(req.params.id)
        if (!checkAuthor(user, post)) {
            return res.status(403).json({ message: "Forbidden action" })
        }
        await PostService.destroy(post)
        await user.removePost(post)
        return res.status(200).json({
            message: "Post deleted successfully",
        })
    } catch (err) {
        console.log(err)
        return res.status(503).json({
            message: err.message,
        })
    }
}

function checkAuthor(user, post) {
    return post.creator.equals(user._id)
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
}
