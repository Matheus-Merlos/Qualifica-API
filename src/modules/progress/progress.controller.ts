import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ParseCoursePipe } from 'src/common/pipes/parse-course.pipe';
import { ParseSectionLesson } from 'src/common/pipes/parse-section-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { ProgressDTO } from './progress.dto';
import { ProgressService } from './progress.service';

@Controller('course/:courseId/progress/:userId')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async courseProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    return await this.progressService.listCourseProgress(userId, courseId);
  }

  @Get(':lessonId')
  async lessonProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
  ) {
    return await this.progressService.getLessonProgress(userId, lessonId);
  }

  @Patch(':lessonId')
  async saveProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
    @Body() progressDto: ProgressDTO,
  ) {
    await this.progressService.edit(userId, lessonId, progressDto);
  }
}
