import {
  bigserial,
  integer,
  pgTable,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import courseSection from './course-section';

export default pgTable('course_additional', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  courseSection: integer()
    .notNull()
    .references(() => courseSection.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 511 }),
  description: text(),
});
