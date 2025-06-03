import { bigserial, integer, pgTable, unique } from 'drizzle-orm/pg-core';
import { courseAdditionalTable } from './course-additional';
import { courseSectionTable } from './course-section';
import { examTable } from './exam';
import { lessonTable } from './lesson';

export const ordinationTable = pgTable(
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
