import { integer, pgTable, serial, unique } from 'drizzle-orm/pg-core';
import courseAdditionalTable from './course-additional';
import courseSectionTable from './course-section';
import examTable from './exam';
import lessonTable from './lesson';

export default pgTable(
  'ordination',
  {
    id: serial().primaryKey(),

    courseSection: integer().references(() => courseSectionTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    lesson: integer().references(() => lessonTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    courseAdditional: integer().references(() => courseAdditionalTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    exam: integer().references(() => examTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    order: integer().notNull(),
  },
  (table) => ({
    uniqueOrderInSection: unique().on(table.courseSection, table.order),
  }),
);
