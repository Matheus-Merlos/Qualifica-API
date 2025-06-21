import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseExamPipe } from 'src/pipes/parse-exam.pipe';
import { ParseQuestionPipe } from 'src/pipes/parse-question.pipe';
import { ParseUserPipe } from 'src/pipes/parse-user.pipe';
import { AnswerDTO } from './answers.dto';
import { AnswersService } from './answers.service';

@Controller('exam/:examId/answers/:userId')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':questionId')
  async registerAnswer(
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
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
      if (error instanceof Error && error.message.includes('Failed query')) {
        throw new BadRequestException(
          'You already answered this question in this exam.',
        );
      }
    }
  }

  @Patch(':questionId')
  async editAnswer(
    @Param('examId', ParseIntPipe, ParseExamPipe) examId: number,
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
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
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
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
