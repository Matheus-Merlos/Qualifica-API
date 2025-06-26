import {
  bigserial,
  integer,
  pgTable,
  text,
  time,
  varchar,
} from 'drizzle-orm/pg-core';
import user from './user';

export default pgTable('lesson', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  duration: integer().notNull(),
  description: text(),
  owner: integer()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
