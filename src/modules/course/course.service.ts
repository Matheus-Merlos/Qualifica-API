import { Injectable } from '@nestjs/common';
import { asc, eq, ilike, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import {
  course,
  courseSection,
  courseTag,
  exam,
  lesson,
  material,
  ordination,
  sectionExam,
  sectionLesson,
  sectionMaterial,
} from 'src/db/schema';
import { CreateCourseDTO, PatchCourseDTO } from './course.dto';

@Injectable()
export class CourseService {
  async search(searchParam: string = '') {
    const courses = await db
      .select({
        id: course.id,
        name: course.name,
        description: course.description,
      })
      .from(course)
      .where(ilike(course.name, `%${searchParam.replaceAll('-', ' ')}%`))
      .orderBy(asc(course.name))
      .limit(25);

    let index = 0;
    for (const crs of courses) {
      const tags: Array<unknown> = [];
      const courseWithTags = { ...crs, tags };

      const dbTags = await db
        .select()
        .from(courseTag)
        .where(eq(courseTag.course, crs.id));

      const tagNames = dbTags.map((tag) => tag.tag);

      courseWithTags.tags = tagNames;

      courses[index] = courseWithTags;

      index++;
    }

    return courses;
  }

  async retrieve(courseId: number) {
    const [dbCourse] = await db
      .select()
      .from(course)
      .where(eq(course.id, courseId));

    const sections = await db
      .select()
      .from(courseSection)
      .where(eq(courseSection.course, courseId))
      .orderBy(asc(courseSection.order));

    const courseWithSections = {
      ...dbCourse,
      sections,
    };

    let index = 0;
    for (const sect of courseWithSections.sections) {
      const resources: Array<unknown> = [];
      const sectionWithResources = { ...sect, resources };

      const orders = await db
        .select({
          lessonId: sectionLesson.lesson,
          materialId: sectionMaterial.material,
          examId: sectionExam.exam,
        })
        .from(ordination)
        .leftJoin(sectionLesson, eq(ordination.sectionLesson, sectionLesson.id))
        .leftJoin(sectionExam, eq(ordination.sectionExam, sectionExam.id))
        .leftJoin(
          sectionMaterial,
          eq(ordination.sectionMaterial, sectionMaterial.id),
        )
        .where(eq(ordination.courseSection, sect.id))
        .orderBy(asc(ordination.order));

      for (const order of orders) {
        const { lessonId, materialId, examId } = order;

        if (lessonId !== null) {
          const [dbLesson] = await db
            .select()
            .from(lesson)
            .where(eq(lesson.id, lessonId));
          sectionWithResources.resources.push({
            type: 'lesson',
            content: dbLesson,
          });
        }

        if (materialId !== null) {
          const [dbMaterial] = await db
            .select()
            .from(material)
            .where(eq(material.id, materialId));
          sectionWithResources.resources.push({
            type: 'material',
            content: dbMaterial,
          });
        }

        if (examId !== null) {
          const [dbExam] = await db
            .select()
            .from(exam)
            .where(eq(exam.id, examId));
          sectionWithResources.resources.push({
            type: 'exam',
            content: dbExam,
          });
        }
      }
      courseWithSections.sections[index] = sectionWithResources;
      index++;
    }

    const dbTags = await db
      .select()
      .from(courseTag)
      .where(eq(courseTag.course, courseWithSections.id));

    const tagNames = dbTags.map((tag) => tag.tag);

    courseWithSections['tags'] = tagNames;

    return courseWithSections;
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
          imageUrl: dto.imageUrl,
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
      Object.keys(dto).includes('description') ||
      Object.keys(dto).includes('imageUrl')
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
