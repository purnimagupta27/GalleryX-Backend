import { integer, pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({ length: 50 }).notNull().unique(),
    password: varchar({ length: 255 }),
    nickname: varchar({ length: 255 }),
    email: varchar({ length: 255 }).unique().notNull(),
    phone: varchar(16).unique(),
    url: varchar({ length: 2048 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

