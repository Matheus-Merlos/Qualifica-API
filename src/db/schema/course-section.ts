import { bigserial, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import course from './course';

export default pgTable('course_section', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  course: integer()
    .notNull()
    .references(() => course.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  name: varchar({ length: 255 }).notNull(),
  order: integer().notNull(),
});
