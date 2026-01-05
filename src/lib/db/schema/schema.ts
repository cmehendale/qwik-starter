import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dummy = sqliteTable("dummy", {
  id: text("id").primaryKey(),
});
