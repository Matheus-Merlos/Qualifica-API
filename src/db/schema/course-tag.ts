import { bigserial, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import course from './course';

export default pgTable('course-tag', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  course: integer()
    .notNull()
    .references(() => course.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  tag: varchar({ length: 255 }).notNull(),
});
