import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/auth/auth.guard';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamService } from './exam.service';

@Controller('exam/:sectionId')
@UseGuards(AuthGuard)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(
    @Param('sectionId') sectionId: string,
    @Body() createExamDto: CreateExamDto,
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
    @Body() updateExamDto: UpdateExamDto,
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
