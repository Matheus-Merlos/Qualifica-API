import { Injectable } from '@nestjs/common';
import { eq, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import {
  courseSection,
  ordination,
  sectionExam,
  sectionLesson,
  sectionMaterial,
} from 'src/db/schema';
import { CreateSectionDTO, Resource } from './section.dto';

@Injectable()
export class SectionService {
  async create(courseId: number, dto: CreateSectionDTO) {
    let createdSection: InferSelectModel<typeof courseSection> | null = null;

    await db.transaction(async (trx) => {
      [createdSection] = await trx
        .insert(courseSection)
        .values({ name: dto.name, course: courseId, order: dto.order })
        .returning();

      let order = 0;
      for (const resource of dto.resources) {
        switch (resource.type) {
          case Resource.LESSON: {
            const [createdSectionLesson] = await trx
              .insert(sectionLesson)
              .values({
                section: createdSection.id,
                lesson: resource.resourceId,
              })
              .returning();

            await trx.insert(ordination).values({
              courseSection: createdSection.id,
              sectionLesson: createdSectionLesson.id,
              order,
            });

            order++;
            break;
          }

          case Resource.EXAM: {
            const [createdSectionExam] = await trx
              .insert(sectionExam)
              .values({
                section: createdSection.id,
                exam: resource.resourceId,
              })
              .returning();

            await trx.insert(ordination).values({
              courseSection: createdSection.id,
              sectionExam: createdSectionExam.id,
              order,
            });

            order++;
            break;
          }

          case Resource.MATERIAL: {
            const [createdSectionMaterial] = await trx
              .insert(sectionMaterial)
              .values({
                section: createdSection.id,
                material: resource.resourceId,
              })
              .returning();

            await trx.insert(ordination).values({
              courseSection: createdSection.id,
              sectionMaterial: createdSectionMaterial.id,
              order,
            });

            order++;
            break;
          }
        }
      }
    });

    return createdSection;
  }

  async destroy(sectionId: number) {
    await db.delete(courseSection).where(eq(courseSection.id, sectionId));
  }
}
