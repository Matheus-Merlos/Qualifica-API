import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import db from 'src/db';
import {
  alternative,
  exam as examTable,
  question,
  sectionExam,
  studentAnswer,
} from 'src/db/schema';
import { AnswerDTO } from './answers.dto';

@Injectable()
export class AnswersService {
  async result(exam: number, userId: number) {
    const questionsWithAnswers = await db
      .select({
        questionId: question.id,
        question: question.text,
        answer: alternative.description,
        alternativeId: alternative.id,
        answeredCorrectly: alternative.isTrue,
      })
      .from(studentAnswer)
      .innerJoin(question, eq(studentAnswer.question, question.id))
      .innerJoin(alternative, eq(studentAnswer.alternative, alternative.id))
      .where(and(eq(studentAnswer.user, userId), eq(studentAnswer.exam, exam)));

    const weightByQuestion = 10 / questionsWithAnswers.length;
    let correctAnswers = 0;
    questionsWithAnswers.forEach((question) => {
      if (question.answeredCorrectly) {
        correctAnswers++;
      }
    });
    const finalScore = correctAnswers * weightByQuestion;

    const [dbExam] = await db
      .select({ name: examTable.name })
      .from(sectionExam)
      .innerJoin(examTable, eq(sectionExam.exam, examTable.id))
      .where(eq(sectionExam.exam, exam));

    const examResult = {
      name: dbExam.name,
      finalScore: finalScore.toFixed(2),
      questionsWithAnswers,
    };

    return examResult;
  }

  async create(exam: number, user: number, question: number, dto: AnswerDTO) {
    const [alt] = await db
      .select()
      .from(alternative)
      .where(eq(alternative.id, dto.alternative));

    if (alt.questionId !== question) {
      throw new Error('This alternative does not belong to this question.');
    }
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
