import { Injectable } from '@nestjs/common';
import { asc, eq, ilike, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import { course, courseSection, courseTag } from 'src/db/schema';
import { CreateCourseDTO, PatchCourseDTO } from './course.dto';

@Injectable()
export class CourseService {
  async search(searchParam: string = '') {
    return await db
      .select({
        id: course.id,
        name: course.name,
        description: course.description,
      })
      .from(course)
      .where(ilike(course.name, `%${searchParam.replaceAll('-', ' ')}%`))
      .orderBy(asc(course.name))
      .limit(25);
  }

  async retrieve(courseId: number) {
    const [dbCourse] = await db
      .select()
      .from(course)
      .where(eq(course.id, courseId));

    dbCourse['sections'] = await db
      .select()
      .from(courseSection)
      .where(eq(courseSection.course, courseId))
      .orderBy(asc(courseSection.order));

    return dbCourse;
  }

  async create(userId: number, dto: CreateCourseDTO) {
    let createdCourse: InferSelectModel<typeof course> | null = null;
    await db.transaction(async (trx) => {
      [createdCourse] = await trx
        .insert(course)
        .values({
          name: dto.name,
          description: dto.description,
          owner: userId,
        })
        .returning();

      // Fazendo dessa forma é mto rapido porque ele insere tudo de uma vez :)
      const promises: Array<Promise<unknown>> = [];
      if (dto.tags) {
        for (const tag of dto.tags) {
          promises.push(
            trx.insert(courseTag).values({ course: createdCourse.id, tag }),
          );
        }
      }

      await Promise.all(promises);
    });

    return createdCourse;
  }

  async listByOwner(userId: number) {
    return await db
      .select()
      .from(course)
      .where(eq(course.owner, userId))
      .orderBy(asc(course.id));
  }

  async edit(userId: number, courseId: number, dto: PatchCourseDTO) {
    if (
      Object.keys(dto).includes('name') ||
      Object.keys(dto).includes('description')
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tags, ...patchCourseObj } = dto;
      console.log(patchCourseObj);
      await db
        .update(course)
        .set(patchCourseObj)
        .where(eq(course.id, courseId));
    }

    if (Object.keys(dto).includes('tags')) {
      await db.transaction(async (trx) => {
        await trx.delete(courseTag).where(eq(courseTag.course, courseId));

        const promises: Array<Promise<unknown>> = [];
        // Usando "!" porque a validação já é feita acima
        for (const tag of dto.tags!) {
          promises.push(
            trx.insert(courseTag).values({ course: courseId, tag }),
          );
        }
        await Promise.all(promises);
      });
    }

    return await db.select().from(course).where(eq(course.id, courseId));
  }

  async destroy(courseId: number) {
    await db.delete(course).where(eq(course.id, courseId));
  }
}
