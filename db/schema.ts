import {
  integer,
  pgTable,
  serial,
  timestamp,
  text,
  decimal,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
};

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatarUrl: text("avatarUrl"),
  ...timestamps,
});

export const inventoryTable = pgTable("inventory", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").default(10).notNull(),
  amount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  ...timestamps,
});
