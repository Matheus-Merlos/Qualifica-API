import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ParseSectionLesson } from 'src/common/pipes/parse-section-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { ProgressDTO } from './progress.dto';
import { ProgressService } from './progress.service';

@Controller('course/:courseId/progress/:userId/:lessonId')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch()
  async saveProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
    @Body() progressDto: ProgressDTO,
  ) {
    await this.progressService.edit(userId, lessonId, progressDto);
  }
}
