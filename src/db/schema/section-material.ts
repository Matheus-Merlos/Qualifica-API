import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import courseSection from './course-section';
import material from './material';

export default pgTable('section_material', {
  id: serial().primaryKey(),
  material: integer()
    .notNull()
    .references(() => material.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  section: integer()
    .notNull()
    .references(() => courseSection.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
