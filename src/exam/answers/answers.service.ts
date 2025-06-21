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
    const [answer] = await db
      .select()
      .from(studentAnswer)
      .where(
        and(
          eq(studentAnswer.user, user),
          eq(studentAnswer.question, question),
          eq(studentAnswer.exam, exam),
        ),
      );
    if (!answer) {
      throw new Error('This question has not been answered before');
    }

    return await db
      .update(studentAnswer)
      .set({
        alternative: dto.alternative,
      })
      .where(eq(studentAnswer.id, answer.id))
      .returning();
  }

  async destroy(exam: number, user: number, question: number) {
    const [answer] = await db
      .select()
      .from(studentAnswer)
      .where(
        and(
          eq(studentAnswer.user, user),
          eq(studentAnswer.question, question),
          eq(studentAnswer.exam, exam),
        ),
      );
    if (!answer) {
      throw new Error('Answer not found.');
    }

    await db
      .delete(studentAnswer)
      .where(
        and(
          eq(studentAnswer.user, user),
          eq(studentAnswer.question, question),
          eq(studentAnswer.exam, exam),
        ),
      );
  }
}
