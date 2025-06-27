import { Injectable } from '@nestjs/common';
import { and, eq, inArray, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import {
  course,
  courseSection,
  progression,
  sectionLesson,
  subscription,
} from 'src/db/schema';
import { SubscriptionDTO } from './subscription.dto';

@Injectable()
export class SubscriptionService {
  async listSubscribed(userId: number) {
    return await db
      .select({
        id: course.id,
        name: course.name,
        thumbnail: course.imageUrl,
      })
      .from(subscription)
      .innerJoin(course, eq(subscription.course, course.id))
      .where(eq(subscription.user, userId));
  }

  async subscribe(userId: number, dto: SubscriptionDTO) {
    let createdSubscription: InferSelectModel<typeof subscription> | null =
      null;

    await db.transaction(async (trx) => {
      [createdSubscription] = await trx
        .insert(subscription)
        .values({ user: userId, course: dto.courseId })
        .returning();

      const courseLessons = await trx
        .select({ id: sectionLesson.id })
        .from(course)
        .innerJoin(courseSection, eq(courseSection.course, course.id))
        .innerJoin(sectionLesson, eq(sectionLesson.section, courseSection.id))
        .where(eq(course.id, dto.courseId));

      const courseLessonsIds = courseLessons.map((cLesson) => cLesson.id);

      for (const lesson of courseLessonsIds) {
        await trx
          .insert(progression)
          .values({ user: userId, sectionLesson: lesson });
      }
    });
    return createdSubscription;
  }

  async unsubscribe(userId: number, courseId: number) {
    await db.transaction(async (trx) => {
      const courseLessons = await db
        .select({ id: sectionLesson.id })
        .from(course)
        .innerJoin(courseSection, eq(courseSection.course, course.id))
        .innerJoin(sectionLesson, eq(sectionLesson.section, courseSection.id))
        .where(eq(course.id, courseId));

      const courseLessonsIds = courseLessons.map((cLesson) => cLesson.id);

      await trx
        .delete(progression)
        .where(
          and(
            eq(progression.user, userId),
            inArray(progression.sectionLesson, courseLessonsIds),
          ),
        );

      await trx
        .delete(subscription)
        .where(
          and(eq(subscription.course, courseId), eq(subscription.user, userId)),
        );
    });
  }
}
