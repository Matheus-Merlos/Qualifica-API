import { bigserial, integer, pgTable, text } from 'drizzle-orm/pg-core';
import question from './question';

export default pgTable('question_option', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  question: integer()
    .notNull()
    .references(() => question.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  description: text().notNull(),
});
