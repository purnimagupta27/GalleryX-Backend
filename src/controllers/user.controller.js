import { eq, sql } from 'drizzle-orm'
import { validate as isUUID } from 'uuid'
import ApiError from '../utils/api-error.js'
import db from '../index.js'
import { usersTable } from '../models/users.model.js'
import { postsTable } from '../models/posts.model.js'
import ApiResponse from '../utils/api-response.js'
import { followsTable } from '../models/follows.model.js'

const getUserProfile = async (req, res) => {
    const { userId } = req.params

    if (!isUUID(userId)) {
        throw ApiError.badRequest("Invalid id")
    }

    const [user] = await db.select({
        id: usersTable.id,
        username: usersTable.username,
        url: usersTable.url,
        nickname: usersTable.nickname,
    })
        .from(usersTable)
        .where(eq(usersTable.id, userId))

    if (!user) {
        throw ApiError.notFound("User not found")
    }

    const posts = await db.select({ id: postsTable.id, url: postsTable.url, caption: postsTable.caption })
        .from(postsTable)
        .where(and(
            eq(postsTable.userId, userId),
            eq(postsTable.isPrivate, false)
        ))
        .orderBy(desc(postsTable.createdAt))


    const [follows] = await db
        .select({
            followers: sql`count(*) filter (
            where ${followsTable.followingId} = ${userId}
        )`,
            following: sql`count(*) filter (
            where ${followsTable.followerId} = ${userId}
        )`
        })
        .from(followsTable)

    res.json(ApiResponse.ok("User profile fetched", {
        user,
        posts,
        follows
    }))
}

export {
    getUserProfile
}