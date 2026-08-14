import { index, pgTable, uniqueIndex, uuid, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.model.js";
import { postsTable } from "./posts.model.js";

export const likesTable = pgTable("likes", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
    postId: uuid().notNull().references(() => postsTable.id, {
        onDelete: "cascade"
    }),
}, (table) => [
    uniqueIndex('unique_user_post_like').on(table.userId, table.postId),
    index("likes_post_id_idx").on(table.postId)
])