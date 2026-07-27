import { validate as isUUID } from 'uuid'
import db from "../index.js"
import { likesTable } from '../models/likes.model.js'
import { postsTable } from '../models/posts.model.js'
import ApiError from '../utils/api-error.js'
import ApiResponse from '../utils/api-response.js'
import { and, eq } from 'drizzle-orm'

const createLike = async (req, res) => {
    const { postId } = req.params

    if (!isUUID(postId)) {
        throw ApiError.badRequest("Invalid id")
    }

    const [post] = await db
        .select()
        .from(postsTable)
        .where(and(
            eq(postsTable.id, postId),
            eq(postsTable.isPrivate, false)
        ))

    if (!post) {
        throw ApiError.notFound("Post not found")
    }

    const [like] = await db.select()
        .from(likesTable)
        .where(and(
            eq(likesTable.userId, req.user.id),
            eq(likesTable.postId, postId)
        ))

    if (like) {
        throw ApiError.conflict("You have already liked this post")
    }

    await db.insert(likesTable).values({
        userId: req.user.id,
        postId
    })

    res.json(ApiResponse.ok("Liked!"))
}

const removeLike = async (req, res) => {
    const { likeId } = req.params

    if (!isUUID(likeId)) {
        throw ApiError.badRequest("Invalid id")
    }

    const [like] = await db
        .select()
        .from(likesTable)
        .where(and(
            eq(likesTable.id, likeId),
            eq(likesTable.userId, req.user.id)
        ))

    if (!like) {
        throw ApiError.notFound("You have not liked this post")
    }

    await db.delete(likesTable)
        .where(and(
            eq(likesTable.id, likeId),
            eq(likesTable.userId, req.user.id)
        )).returning()

    res.json(ApiResponse.ok("Post disliked!"))
}

export {
    createLike,
    removeLike
}