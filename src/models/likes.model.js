import { integer, pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
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
})