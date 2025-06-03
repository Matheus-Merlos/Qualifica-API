import { boolean, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { questionTable } from './question';

export const alternativeTable = pgTable('alternative', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questionTable.id).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  isTrue: boolean('is_true').notNull(),
});

export type Alternative = typeof alternativeTable.$inferSelect;
export type NewAlternative = typeof alternativeTable.$inferInsert;
