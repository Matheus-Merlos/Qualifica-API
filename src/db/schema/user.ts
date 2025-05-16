import { date, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export default pgTable('user', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  salt: varchar({ length: 16 }).notNull(),
  passwordHash: varchar({ length: 256 }).notNull(),
  birthdate: date().notNull(),
  bio: text(),
});
