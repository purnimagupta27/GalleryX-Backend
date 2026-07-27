import { integer, pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.model.js";
import { postsTable } from "./posts.model.js";

export const searchesTable = pgTable("searches", {
    id: uuid().primaryKey().defaultRandom(),
    query: text().notNull(),
    userId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})