import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseLessonPipe } from 'src/common/pipes/parse-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateLessonDTO, UpdateLessonDTO } from './lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(':userId')
  async create(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() createLessonDTO: CreateLessonDTO,
  ) {
    return await this.lessonService.create(userId, createLessonDTO);
  }

  @Get(':lessonId')
  async findOne(
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) lessonId: number,
  ) {
    return this.lessonService.retrieve(lessonId);
  }

  @Patch(':userId/:lessonId')
  update(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) lessonId: number,
    @Body() updateLessonDTO: UpdateLessonDTO,
  ) {
    return this.lessonService.update(userId, lessonId, updateLessonDTO);
  }

  @Delete(':userId/:lessonId')
  remove(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) examId: number,
  ) {
    return this.lessonService.destroy(userId, examId);
  }
}
