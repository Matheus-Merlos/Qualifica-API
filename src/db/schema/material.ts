import { bigserial, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import user from './user';

export default pgTable('material', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  url: varchar({ length: 511 }),
  name: varchar({ length: 255 }),
  owner: integer()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
