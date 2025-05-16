import { bigserial, integer, pgTable, text } from 'drizzle-orm/pg-core';
import exam from './exam';

export default pgTable('question', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  exam: integer()
    .notNull()
    .references(() => exam.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  questionText: text().notNull(),
  correctAnswer: integer().notNull(),
});
