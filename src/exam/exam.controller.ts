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
import { ParseUserPipe } from 'src/pipes/parse-user.pipe';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get(':examId')
  findOne(@Param('examId', ParseIntPipe, ParseExamPipe) examId: number) {
    return this.examService.retrieve(examId);
  }

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() createExamDto: CreateExamDTO,
  ) {
    return this.examService.create(userId, createExamDto);
  }

  @Patch(':userId/:examId')
  update(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Body() updateExamDto: UpdateExamDTO,
  ) {
    return this.examService.update(userId, examId, updateExamDto);
  }

  @Delete(':userId/:examId')
  remove(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
  ) {
    return this.examService.destroy(userId, examId);
  }
}
