import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
    id: serial("id").primaryKey(),
    jsonform: text("jsonform").notNull(),
    createdBy: varchar("createdBy").notNull(),
    crestedAt: varchar("CreatedAt").notNull(),
})