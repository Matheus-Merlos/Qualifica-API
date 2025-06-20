import { relations } from 'drizzle-orm';
import {
  bigserial,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import sectionLesson from './section-lesson';
import user from './user';

const comment = pgTable('comment', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  sectionLesson: integer()
    .notNull()
    .references(() => sectionLesson.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  user: integer()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  parentComment: integer('parent_comment'), //this is a self relationship created in const commentRelations
  content: text().notNull(),
  creationTimestamp: timestamp().defaultNow(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  parentComment: one(comment, {
    fields: [comment.parentComment],
    references: [comment.id],
  }),
}));

export default comment;
