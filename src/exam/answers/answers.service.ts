import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import db from 'src/db';
import { studentAnswer } from 'src/db/schema';
import { AnswerDTO } from './answers.dto';

@Injectable()
export class AnswersService {
  async create(exam: number, user: number, question: number, dto: AnswerDTO) {
    return await db
      .insert(studentAnswer)
      .values({
        question,
        exam,
        user,
        alternative: dto.alternative,
      })
      .returning();
  }

  async edit(exam: number, user: number, question: number, dto: AnswerDTO) {
    return await db
      .update(studentAnswer)
      .set({
        alternative: dto.alternative,
      })
      .where(
        and(
          eq(studentAnswer.user, user),
          eq(studentAnswer.question, question),
          eq(studentAnswer.exam, exam),
        ),
      )
      .returning();
  }

  async destroy(exam: number, user: number, question: number) {
    return await db
      .delete(studentAnswer)
      .where(
        and(
          eq(studentAnswer.user, user),
          eq(studentAnswer.question, question),
          eq(studentAnswer.exam, exam),
        ),
      )
      .returning();
  }
}
