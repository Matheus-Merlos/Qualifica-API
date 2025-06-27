import { Injectable } from '@nestjs/common';
import { eq, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import { lesson as lessonModel } from 'src/db/schema';
import { CreateLessonDTO, UpdateLessonDTO } from './lesson.dto';

@Injectable()
export class LessonService {
  async create(userId: number, createLessonDTO: CreateLessonDTO) {
    const parts = createLessonDTO.duration.split(':').map(Number);

    let totalSeconds = 0;

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      totalSeconds = minutes * 60 + seconds;
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    let lesson: InferSelectModel<typeof lessonModel> | null = null;
    try {
      [lesson] = await db
        .insert(lessonModel)
        .values({
          url: createLessonDTO.url,
          name: createLessonDTO.name,
          duration: totalSeconds,
          description: createLessonDTO.description,
          owner: userId,
        })
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
    return lesson!;
  }

  async retrieve(id: number) {
    return db.select().from(lessonModel).where(eq(lessonModel.id, id)).limit(1);
  }

  async update(
    owner: number,
    lessonId: number,
    updateLessonDTO: UpdateLessonDTO,
  ) {
    let dataToUpdate = {};
    if (updateLessonDTO.duration != null) {
      const parts = updateLessonDTO.duration.split(':').map(Number);

      let totalSeconds = 0;

      if (parts.length === 2) {
        const [minutes, seconds] = parts;
        totalSeconds = minutes * 60 + seconds;
      } else if (parts.length === 3) {
        const [hours, minutes, seconds] = parts;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
      }
      dataToUpdate = {
        duration: totalSeconds,
      };
    }
    if (updateLessonDTO.description != null) {
      dataToUpdate['description'] = updateLessonDTO.description;
    }
    if (updateLessonDTO.name != null) {
      dataToUpdate['name'] = updateLessonDTO.name;
    }
    if (updateLessonDTO.url != null) {
      dataToUpdate['url'] = updateLessonDTO.url;
    }

    let lesson: InferSelectModel<typeof lessonModel> | null = null;

    try {
      [lesson] = await db
        .update(lessonModel)
        .set(dataToUpdate)
        .where(eq(lessonModel.id, lessonId))
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return lesson!;
  }

  async destroy(userId: number, lessonId: number) {
    await db.delete(lessonModel).where(eq(lessonModel.id, lessonId));
  }
}
