import { integer, pgTable, serial, unique } from 'drizzle-orm/pg-core';
import courseSectionTable from './course-section';
import sectionExam from './section-exam';
import sectionLesson from './section-lesson';
import sectionMaterial from './section-material';

export default pgTable(
  'ordination',
  {
    id: serial().primaryKey(),

    courseSection: integer()
      .notNull()
      .references(() => courseSectionTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    sectionLesson: integer().references(() => sectionLesson.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    sectionMaterial: integer().references(() => sectionMaterial.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    sectionExam: integer().references(() => sectionExam.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    order: integer().notNull(),
  },
  (table) => ({
    uniqueOrderInSection: unique().on(table.courseSection, table.order),
  }),
);
