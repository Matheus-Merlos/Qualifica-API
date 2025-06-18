import { Injectable } from '@nestjs/common';
import db from 'src/db';
import { course, courseTag } from 'src/db/schema';
import { CreateCourseDTO } from './course.dto';

@Injectable()
export class CourseService {
  async createCourse(userId: number, dto: CreateCourseDTO) {
    await db.transaction(async (trx) => {
      const [createdCourse] = await trx
        .insert(course)
        .values({
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
  }
}
