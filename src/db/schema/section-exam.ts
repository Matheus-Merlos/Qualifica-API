import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import courseSection from './course-section';
import exam from './exam';

export default pgTable('section_exam', {
  id: serial().primaryKey(),
  exam: integer()
    .notNull()
    .references(() => exam.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  section: integer()
    .notNull()
    .references(() => courseSection.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
