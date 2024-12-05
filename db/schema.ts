import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postViews = sqliteTable("post_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postSlug: text("post_slug").notNull(),
  views: integer("views").notNull().default(1),
  lastViewed: text("last_viewed").notNull(),
});
