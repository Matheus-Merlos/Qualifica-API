import { integer, pgTable, serial, uniqueIndex } from 'drizzle-orm/pg-core';
import { alternative, exam, question } from '.';
import user from './user';

export default pgTable(
  'answer',
  {
    id: serial().primaryKey(),

    user: integer()
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    question: integer().references(() => question.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    alternative: integer().references(() => alternative.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    exam: integer().references(() => exam.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => [
    uniqueIndex('unique_question_answer_idx').on(
      table.exam,
      table.question,
      table.user,
    ),
  ],
);
