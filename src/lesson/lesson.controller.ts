import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ParseSectionPipe } from 'src/pipes/parse-section.pipe';
import { CreateLessonDto } from './lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(':sectionID')
  async createLesson(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Body() createLessonDto: CreateLessonDto,
  ){
    return await this.lessonService.create(sectionId, createLessonDto);
  }

  @Get(':lessonId')
  async findOnde(@Param('lessonId', ParseIntPipe, ParseLe))

}
