import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import questionTable from './question';

const alternativeTable = pgTable('alternative', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id')
    .references(() => questionTable.id)
    .notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  isTrue: boolean('is_true').notNull(),
});

export type Alternative = InferSelectModel<typeof alternativeTable>;
export type NewAlternative = InferInsertModel<typeof alternativeTable>;

export default alternativeTable;
