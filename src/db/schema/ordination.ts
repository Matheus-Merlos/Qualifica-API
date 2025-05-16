import { bigserial, integer, pgTable, unique } from 'drizzle-orm/pg-core';
import courseAddional from './course-addional';
import courseSection from './course-section';
import exam from './exam';
import lesson from './lesson';

export default pgTable(
  'ordination',
  {
    id: bigserial({ mode: 'number' }).primaryKey(),
    courseSection: integer()
      .notNull()
      .references(() => courseSection.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    lesson: integer().references(() => lesson.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    courseAddional: integer().references(() => courseAddional.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    exam: integer().references(() => exam.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer().notNull(),
  },
  (table) => ({
    uniqueOrderInSection: unique().on(table.courseSection, table.order),
  }),
);
