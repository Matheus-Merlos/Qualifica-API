import { bigserial, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import user from './user';

export default pgTable('exam', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  owner: integer()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
