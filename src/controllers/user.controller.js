import { eq } from 'drizzle-orm'
import { validate as isUUID } from 'uuid'
import ApiError from '../utils/api-error.js'
import db from '../index.js'
import { usersTable } from '../models/users.model.js'
import { postsTable } from '../models/posts.model.js'
import ApiResponse from '../utils/api-response.js'

const getUserProfile = async (req, res) => {
    const { userId } = req.params

    if (!isUUID(userId)) {
        throw ApiError.badRequest("Invalid id")
    }

    const rows = await db.select({
        username: usersTable.username,
        url: usersTable.url,
        nickname: usersTable.nickname,
        posts: postsTable.url
    })
        .from(usersTable)
        .leftJoin(postsTable,
            eq(postsTable.userId, usersTable.id))
        .where(eq(usersTable.id, userId))

    if (rows.length === 0) {
        throw ApiError.notFound("User not found")
    }

    const user = {
        username: rows[0].username,
        nickname: rows[0].nickname,
        url: rows[0].url,
        posts: rows
            .filter(row => row.posts !== null)
            .map(row => row.posts)
    }

    res.json(ApiResponse.ok("User profile fetched", user))
}

export {
    getUserProfile
}