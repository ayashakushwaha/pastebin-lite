import { pgTable, text, integer, timestamp, varchar, boolean, index } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const pastesTable = pgTable("pastes", {
  id: varchar("id", { length: 8 }).primaryKey().$defaultFn(() => nanoid(8)),
  content: text("content").notNull(),
  remainingViews: integer(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
},
  (table) => ({
    expiresIdx: index("pastes_expires_idx").on(table.expiresAt),
    createdIdx: index("pastes_created_idx").on(table.createdAt),
  })
);

export type insertPaste = typeof pastesTable.$inferInsert
export type selectPaste = typeof pastesTable.$inferSelect
