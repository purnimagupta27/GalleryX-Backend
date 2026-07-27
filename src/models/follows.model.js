import { integer, pgTable, varchar, uuid, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { usersTable } from "./users.model.js";

export const followsTable = pgTable("follows", {
    id: uuid().primaryKey().defaultRandom(),
    followerId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
    followingId: uuid().notNull().references(() => usersTable.id, {
        onDelete: "cascade"
    }),
}, (table) => [
//   unique('unique_follower_per_following').on(table.followerId, table.followingId),
  check("prevent_self_follow", sql`${table.followerId} <> ${table.followingId}`)
])