import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
    id: serial("id").primaryKey(),
    jsonform: text("jsonform").notNull(),
    theme:  varchar("theme"),
    background: varchar("background"),
    style: varchar("style"),
    createdBy: varchar("createdBy").notNull(),
    crestedAt: varchar("CreatedAt").notNull(),
    enabledSignIn: boolean("enabledSignIn").default(false),
})

export const userResponses = pgTable("userResponses", {
    id: serial("id").primaryKey(),
    formId: serial("formId").references(()=>forms.id),
    jsonResponse: text("jsonResponse").notNull(),
    filledBy: varchar("filledBy").default("anonymus"),
    filledAt: varchar("filledAt").notNull(),

})