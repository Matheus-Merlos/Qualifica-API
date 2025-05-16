import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import user from './user';

export default pgTable('course', {
  id: serial().primaryKey(),
  description: text().notNull(),
  owner: integer()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});
