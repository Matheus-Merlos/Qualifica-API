import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import db from 'src/db';
import { progression } from 'src/db/schema';
import { ProgressDTO } from './progress.dto';

@Injectable()
export class ProgressService {
  async edit(userId: number, lessonId: number, dto: ProgressDTO) {
    const parts = dto.time.split(':').map(Number);

    let totalSeconds = 0;

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      totalSeconds = minutes * 60 + seconds;
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    await db
      .update(progression)
      .set({ timedWatched: totalSeconds })
      .where(
        and(
          eq(progression.sectionLesson, lessonId),
          eq(progression.user, userId),
        ),
      );
  }
}
