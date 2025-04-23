import { integer, pgTable, serial, unique } from 'drizzle-orm/pg-core';
import course from './course';
import user from './user';

export default pgTable(
  'subscription',
  {
    id: serial().primaryKey(),
    user: integer()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    course: integer()
      .notNull()
      .references(() => course.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      userCourseUnique: unique().on(table.user, table.course),
    };
  },
);
