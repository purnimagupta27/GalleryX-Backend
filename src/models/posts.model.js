import { integer, pgTable, varchar, uuid, timestamp, boolean, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.model.js";
import { boardsTable } from "./boards.model.js";

export const postsTable = pgTable("posts", {
    id: uuid().primaryKey().defaultRandom(),
    url: text().notNull(),
    caption: varchar({ length: 500 }),
    isPrivate: boolean("is_private").default(false),
    userId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
    boardId: uuid().references(() => boardsTable.id, {
        onDelete: "set null"
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})