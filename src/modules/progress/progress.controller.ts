import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsUserPipe } from 'src/common/pipes/is-user.pipe';
import { ParseCoursePipe } from 'src/common/pipes/parse-course.pipe';
import { ParseSectionLesson } from 'src/common/pipes/parse-section-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { ProgressDTO } from './progress.dto';
import { ProgressService } from './progress.service';

@UseGuards(AuthGuard)
@Controller('course/:courseId/progress/:userId')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  async courseProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    return await this.progressService.listCourseProgress(userId, courseId);
  }

  @Get(':lessonId')
  async lessonProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
  ) {
    return await this.progressService.getLessonProgress(userId, lessonId);
  }

  @Patch(':lessonId')
  async saveProgress(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
    @Body() progressDto: ProgressDTO,
  ) {
    await this.progressService.edit(userId, lessonId, progressDto);
  }
}
