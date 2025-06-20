import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import courseSection from './course-section';
import lesson from './lesson';

export default pgTable('section_exam', {
  id: serial().primaryKey(),
  lesson: integer()
    .notNull()
    .references(() => lesson.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  section: integer()
    .notNull()
    .references(() => courseSection.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
