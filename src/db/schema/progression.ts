import { bigserial, integer, pgTable } from 'drizzle-orm/pg-core';
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
  timedWatched: integer().notNull().default(0),
});
