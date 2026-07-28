import db from "../index.js"
import { boardsTable } from "../models/boards.model.js"
import { postsTable } from "../models/posts.model.js"
import ApiError from "../utils/api-error.js"
import ApiResponse from "../utils/api-response.js"
import { eq, and } from "drizzle-orm"
import { validate as isUUID } from 'uuid'

const createBoard = async (req, res) => {
    const { name } = req.body

    if (!name || name.trim() === "") {
        throw ApiError.badRequest("Name is required")
    }

    const [existingName] = await db
        .select()
        .from(boardsTable)
        .where(and(
            eq(boardsTable.name, name),
            eq(boardsTable.userId, req.user.id)
        ))

    if (existingName) {
        throw ApiError.conflict("Board with this name already exists")
    }

    const board = await db
        .insert(boardsTable)
        .values({
            name,
            userId: req.user.id
        }).returning()

    res.json(ApiResponse.created("Board created", board))
}

const updateBoardName = async (req, res) => {
    const { name } = req.body
    const { boardId } = req.params

    if (!isUUID(boardId)) {
        throw ApiError.badRequest("Invalid id")
    }

    const [board] = await db
        .select()
        .from(boardsTable)
        .where(and(
            eq(boardsTable.id, boardId),
            eq(boardsTable.userId, req.user.id)
        ))

    if (!board) {
        throw ApiError.notFound("Board with id does not found")
    }

    if (!name || name.trim() === "") {
        throw ApiError.badRequest("Name is required")
    }

    const updatedBoard = await db
        .update(boardsTable)
        .set({ name })
        .where(and(
            eq(boardsTable.id, boardId),
            eq(boardsTable.userId, req.user.id)
        )).returning()

    res.json(ApiResponse.ok("Board name updated", updatedBoard))
}

const addPostToBoard = async (req, res) => {
    const { boardId, postId } = req.params

    if (!isUUID(boardId) || !isUUID(postId)) {
        throw ApiError.badRequest("Invalid board id or post id")
    }

    const [board] = await db
        .select()
        .from(boardsTable)
        .where(and(
            eq(boardsTable.id, boardId),
            eq(boardsTable.userId, req.user.id)
        ))

    if (!board) {
        throw ApiError.notFound("Board not found")
    }

    const [post] = await db
        .select()
        .from(postsTable)
        .where(and(
            eq(postsTable.id, postId),
            eq(postsTable.userId, req.user.id)
        ))

    if (!post) {
        throw ApiError.notFound("Post not found")
    }

    if (post.boardId) {
        throw ApiError.conflict("Post is already added to a board")
    }

    const addedPost = await db
        .update(postsTable)
        .set({ boardId })
        .where(and(
            eq(postsTable.id, postId),
            eq(postsTable.userId, req.user.id)
        )).returning()

    res.json(ApiResponse.created("Post added", addedPost))
}

const removePostFromBoard = async (req, res) => {
    const { boardId, postId } = req.params

    if (!isUUID(boardId) || !isUUID(postId)) {
        throw ApiError.badRequest("Invalid board id or post id")
    }

    const [board] = await db
        .select()
        .from(boardsTable)
        .where(and(
            eq(boardsTable.id, boardId),
            eq(boardsTable.userId, req.user.id)
        ))

    if (!board) {
        throw ApiError.notFound("Board not found")
    }

    const [post] = await db
        .select()
        .from(postsTable)
        .where(and(
            eq(postsTable.id, postId),
            eq(postsTable.userId, req.user.id)
        ))

    if (!post) {
        throw ApiError.notFound("Post not found")
    }

    if (post.boardId !== boardId) {
        throw ApiError.notFound("Post is not in board")
    }

    const removedPost = await db
        .update(postsTable)
        .set({ boardId: null })
        .where(and(
            eq(postsTable.id, postId),
            eq(postsTable.userId, req.user.id)
        )).returning()

    res.json(ApiResponse.ok("Post Removed", removedPost.id))
}

export {
    createBoard,
    updateBoardName,
    addPostToBoard,
    removePostFromBoard
}