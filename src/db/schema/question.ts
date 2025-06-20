import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import examTable from './exam';

export const questionTable = pgTable('question', {
  id: serial('id').primaryKey(),
  examId: integer('exam_id')
    .references(() => examTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  text: varchar('text', { length: 255 }).notNull(),
});

export type Question = typeof questionTable.$inferSelect;
export type NewQuestion = typeof questionTable.$inferInsert;
export default questionTable;
