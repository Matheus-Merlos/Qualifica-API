import { bigserial, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import courseSection from './course-section';

export default pgTable('material', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  courseSection: integer()
    .notNull()
    .references(() => courseSection.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  url: varchar({ length: 511 }),
  name: varchar({ length: 255 }),
});
