import { bigserial, boolean, integer, pgTable } from 'drizzle-orm/pg-core';
import user from './user';
import lesson from './lesson';

export default pgTable('progression', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  user: integer()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  lesson: integer()
    .notNull()
    .references(() => lesson.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  completed: boolean().default(false),
  timedWatched: integer().notNull().default(0),
});
