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
import { ParseExamPipe } from 'src/common/pipes/parse-exam.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamService } from './exam.service';

@UseGuards(AuthGuard)
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get(':examId')
  findOne(@Param('examId', ParseIntPipe, ParseExamPipe) examId: number) {
    return this.examService.retrieve(examId);
  }

  @Get(':userId/exams')
  async retrieveByOwner(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
  ) {
    return await this.examService.listByOwner(userId);
  }

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Body() createExamDto: CreateExamDTO,
  ) {
    return this.examService.create(userId, createExamDto);
  }

  @Patch(':userId/:examId')
  update(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Body() updateExamDto: UpdateExamDTO,
  ) {
    return this.examService.update(userId, examId, updateExamDto);
  }

  @Delete(':userId/:examId')
  remove(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
  ) {
    return this.examService.destroy(userId, examId);
  }
}
