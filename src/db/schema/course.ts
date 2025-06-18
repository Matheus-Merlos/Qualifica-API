import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import user from './user';

export default pgTable('course', {
  id: serial().primaryKey(),
  name: varchar({ length: 512 }),
  description: text(),
  owner: integer()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});
