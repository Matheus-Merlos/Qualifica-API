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
import { ParseExamPipe } from 'src/pipes/parse-exam.pipe';
import { ParseSectionPipe } from 'src/pipes/parse-section.pipe';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamService } from './exam.service';

@Controller('exam/:sectionId')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Body() createExamDto: CreateExamDTO,
  ) {
    return this.examService.create(sectionId, createExamDto);
  }

  @Get()
  findAll(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
  ) {
    return this.examService.findAllBySection(sectionId);
  }

  @Get(':examId')
  findOne(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
  ) {
    return this.examService.findOne(sectionId, examId);
  }

  @Patch(':examId')
  update(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Param('examId') examId: string,
    @Body() updateExamDto: UpdateExamDTO,
  ) {
    return this.examService.update(sectionId, +examId, updateExamDto);
  }

  @Delete(':examId')
  remove(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
  ) {
    return this.examService.remove(sectionId, examId);
  }
}
