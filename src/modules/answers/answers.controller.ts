import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsUserPipe } from 'src/common/pipes/is-user.pipe';
import { ParseExamPipe } from 'src/common/pipes/parse-exam.pipe';
import { ParseQuestionPipe } from 'src/common/pipes/parse-question.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { AnswerDTO } from './answers.dto';
import { AnswersService } from './answers.service';

@UseGuards(AuthGuard)
@Controller('exam/:examId/answers/:userId')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  async getExamResult(
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
  ) {
    return await this.answersService.result(examId, userId);
  }

  @Post(':questionId')
  async registerAnswer(
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('questionId', ParseIntPipe, ParseQuestionPipe)
    questionId: number,
    @Body() answerDto: AnswerDTO,
  ) {
    try {
      return await this.answersService.create(
        examId,
        userId,
        questionId,
        answerDto,
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Failed query')) {
          throw new BadRequestException(
            'You already answered this question in this exam.',
          );
        }
        if (error.message.includes('alternative')) {
          throw new BadRequestException(error.message);
        }
      }
    }
  }

  @Patch(':questionId')
  async editAnswer(
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('questionId', ParseIntPipe, ParseQuestionPipe)
    questionId: number,
    @Body() answerDto: AnswerDTO,
  ) {
    try {
      return await this.answersService.edit(
        examId,
        userId,
        questionId,
        answerDto,
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('answered')) {
          throw new BadRequestException(error.message);
        }
      }
    }
  }

  @Delete(':questionId')
  async deleteAnswer(
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('questionId', ParseIntPipe, ParseQuestionPipe)
    questionId: number,
  ) {
    try {
      return await this.answersService.destroy(examId, userId, questionId);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new NotFoundException('Answer not found');
        }
      }
    }
  }
}
