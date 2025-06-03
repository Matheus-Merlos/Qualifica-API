import { bigserial, integer, pgTable, unique } from 'drizzle-orm/pg-core';
import { default as courseAdditionalTable } from './course-additional';
import { default as courseSectionTable } from './course-section';
import { default as examTable } from './exam';
import { default as lessonTable } from './lesson';

export default pgTable(
  'ordination',
  {
    id: bigserial({ mode: 'number' }).primaryKey(),

    courseSection: integer()
      .notNull()
      .references(() => courseSectionTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    lesson: integer()
      .notNull()
      .references(() => lessonTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    courseAdditional: integer()
      .notNull()
      .references(() => courseAdditionalTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    exam: integer()
      .notNull()
      .references(() => examTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    order: integer().notNull(),
  },
  (table) => ({
    uniqueOrderInSection: unique().on(table.courseSection, table.order),
  }),
);
