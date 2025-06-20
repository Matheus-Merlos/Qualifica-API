import { bigserial, boolean, integer, pgTable } from 'drizzle-orm/pg-core';
import sectionLesson from './section-lesson';
import user from './user';

export default pgTable('progression', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  user: integer()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  sectionLesson: integer()
    .notNull()
    .references(() => sectionLesson.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  completed: boolean().default(false),
  timedWatched: integer().notNull().default(0),
});
