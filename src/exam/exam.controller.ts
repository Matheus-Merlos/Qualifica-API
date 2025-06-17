import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamService } from './exam.service';

@Controller('exam/:sectionId')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(
    @Param('sectionId') sectionId: string,
    @Body() createExamDto: CreateExamDTO,
  ) {
    return this.examService.create(+sectionId, createExamDto);
  }

  @Get()
  findAll(@Param('sectionId') sectionId: string) {
    return this.examService.findAllBySection(+sectionId);
  }

  @Get(':examId')
  findOne(
    @Param('sectionId') sectionId: string,
    @Param('examId') examId: string,
  ) {
    return this.examService.findOne(+sectionId, +examId);
  }

  @Patch(':examId')
  update(
    @Param('sectionId') sectionId: string,
    @Param('examId') examId: string,
    @Body() updateExamDto: UpdateExamDTO,
  ) {
    return this.examService.update(+sectionId, +examId, updateExamDto);
  }

  @Delete(':examId')
  remove(
    @Param('sectionId') sectionId: string,
    @Param('examId') examId: string,
  ) {
    return this.examService.remove(+sectionId, +examId);
  }
}
