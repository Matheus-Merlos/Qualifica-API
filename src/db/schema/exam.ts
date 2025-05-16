import { bigserial, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import courseSection from './course-section';

export default pgTable('exam', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  courseSection: integer()
    .notNull()
    .references(() => courseSection.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  name: varchar({ length: 255 }).notNull(),
});
