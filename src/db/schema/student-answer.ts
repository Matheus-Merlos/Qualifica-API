import { bigserial, integer, pgTable } from 'drizzle-orm/pg-core';
import question from './question';
import questionOptions from './question-options';
import user from './user';

export default pgTable('student_answer', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  question: integer()
    .notNull()
    .references(() => question.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  questionOptions: integer()
    .notNull()
    .references(() => questionOptions.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  user: integer()
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});
