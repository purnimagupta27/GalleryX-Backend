import { integer, pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.model.js";
import { postsTable } from "./posts.model.js";

export const commentsTable = pgTable("comments", {
    id: uuid().primaryKey().defaultRandom(),
    message: text().notNull(),
    userId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
    postId: uuid().notNull().references(() => postsTable.id,{
        onDelete: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})