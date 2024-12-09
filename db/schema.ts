import {
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  text,
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

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: real("price").default(100.1).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  ...timestamps,
});

export const inventoryTable = pgTable("inventory", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").default(10).notNull(),
  totalAmount: real("totalAmount").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  ...timestamps,
});

// Type definitions for inserts
export type InsertUser = typeof usersTable.$inferInsert;
export type InsertProduct = typeof productsTable.$inferInsert;
export type InsertInventory = typeof inventoryTable.$inferInsert;
