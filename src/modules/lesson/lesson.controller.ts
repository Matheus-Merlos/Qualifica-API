import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsUserPipe } from 'src/common/pipes/is-user.pipe';
import { ParseLessonPipe } from 'src/common/pipes/parse-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateLessonDTO, UpdateLessonDTO } from './lesson.dto';
import { LessonService } from './lesson.service';

@UseGuards(AuthGuard)
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(':userId')
  async create(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
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

  @Get(':userId/lessons')
  async getAllByOwner(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
  ) {
    return await this.lessonService.listByOwner(userId);
  }

  @Patch(':userId/:lessonId')
  update(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) lessonId: number,
    @Body() updateLessonDTO: UpdateLessonDTO,
  ) {
    return this.lessonService.update(userId, lessonId, updateLessonDTO);
  }

  @Delete(':userId/:lessonId')
  remove(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) examId: number,
  ) {
    return this.lessonService.destroy(userId, examId);
  }
}
