import { integer, pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.model.js";
import { postsTable } from "./posts.model.js";

export const boardsTable = pgTable("boards", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar( {length: 50}).default("Board"),
    userId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})