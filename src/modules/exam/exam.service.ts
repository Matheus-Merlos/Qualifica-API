import { Injectable } from '@nestjs/common';
import { asc, eq, InferSelectModel } from 'drizzle-orm';
import { TransactionError } from 'src/app.exceptions';
import db from 'src/db';
import {
  alternative as alternativeTable,
  exam,
  exam as examTable,
  question as questionTable,
  user,
} from 'src/db/schema';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';

@Injectable()
export class ExamService {
  async create(userId: number, dto: CreateExamDTO) {
    let exam: InferSelectModel<typeof examTable> | null = null;
    try {
      await db.transaction(async (trx) => {
        [exam] = await trx
          .insert(examTable)
          .values({ name: dto.name, owner: userId })
          .returning();

        for (const question of dto.questions) {
          const [dbQuestion] = await trx
            .insert(questionTable)
            .values({ examId: exam.id, text: question.question })
            .returning();

          const altRows = question.alternatives.map((alternative) => ({
            questionId: dbQuestion.id,
            description: alternative.description,
            isTrue: alternative.isTrue,
          }));

          await trx.insert(alternativeTable).values(altRows);
        }
      });
    } catch (error) {
      throw new TransactionError((error as Error).message);
    }

    return exam;
  }

  async listByOwner(userId: number) {
    return await db
      .select()
      .from(exam)
      .where(eq(exam.owner, userId))
      .orderBy(asc(exam.id));
  }

  /* READ → one exam with questions + alternatives */
  async retrieve(examId: number) {
    const [exam] = await db
      .select({
        id: examTable.id,
        name: examTable.name,
        owner: user.name,
      })
      .from(examTable)
      .where(eq(examTable.id, examId))
      .innerJoin(user, eq(examTable.owner, user.id));

    const rows = await db
      .select({
        questionId: questionTable.id,
        question: questionTable.text,
        alternativeId: alternativeTable.id,
        description: alternativeTable.description,
        isTrue: alternativeTable.isTrue,
      })
      .from(questionTable)
      .leftJoin(
        alternativeTable,
        eq(alternativeTable.questionId, questionTable.id),
      )
      .where(eq(questionTable.examId, examId));

    // agrega alternativas por questão
    const map: Record<
      number,
      {
        questionId: number;
        question: string;
        alternatives: Array<{
          id: number | null;
          description: string | null;
        }>;
      }
    > = {};

    for (const row of rows) {
      if (!map[row.questionId]) {
        map[row.questionId] = {
          questionId: row.questionId,
          question: row.question,
          alternatives: [],
        };
      }
      if (row['alternativeId']) {
        map[row.questionId].alternatives.push({
          id: row.alternativeId,
          description: row.description,
        });
      }
    }

    return { ...exam, questions: [...Object.values(map)] };
  }

  async update(userId: number, examId: number, dto: UpdateExamDTO) {
    //Update de name
    if (Object.keys(dto).includes('name')) {
      await db
        .update(examTable)
        .set({ name: dto.name })
        .where(eq(examTable.id, examId));
    }

    //Update das questões
    if (Object.keys(dto).includes('questions')) {
      await db.transaction(async (trx) => {
        await trx.delete(questionTable).where(eq(questionTable.examId, examId));

        //Recria tudo
        for (const question of dto.questions!) {
          const [dbQuestion] = await trx
            .insert(questionTable)
            .values({ examId, text: question.question })
            .returning();

          const altRows = question.alternatives.map((alternative) => ({
            questionId: dbQuestion.id,
            description: alternative.description,
            isTrue: alternative.isTrue,
          }));

          await trx.insert(alternativeTable).values(altRows);
        }
      });
    }

    return await db.select().from(examTable).where(eq(examTable.id, examId));
  }

  async destroy(userId: number, examId: number) {
    await db.delete(examTable).where(eq(examTable.id, examId));
  }
}
