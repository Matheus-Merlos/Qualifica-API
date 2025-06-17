import { Injectable } from '@nestjs/common';
import { and, eq, InferSelectModel } from 'drizzle-orm';
import { TransactionError } from 'src/app.exceptions';
import db from 'src/db';
import {
  alternative as alternativeTable,
  exam as examTable,
  question as questionTable,
} from '../db/schema';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';

@Injectable()
export class ExamService {
  /* CREATE */
  async create(sectionId: number, dto: CreateExamDTO) {
    let exam: InferSelectModel<typeof examTable> | null = null;
    try {
      await db.transaction(async (trx) => {
        [exam] = await trx
          .insert(examTable)
          .values({ courseSection: sectionId, name: dto.examName })
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

  /* READ → all exams for a section */
  findAllBySection(sectionId: number) {
    return db
      .select()
      .from(examTable)
      .where(eq(examTable.courseSection, sectionId));
  }

  /* READ → one exam with questions + alternatives */
  async findOne(sectionId: number, examId: number) {
    const [exam] = await db
      .select()
      .from(examTable)
      .where(
        and(eq(examTable.id, examId), eq(examTable.courseSection, sectionId)),
      );

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
          isTrue: boolean | null;
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
          isTrue: row.isTrue,
        });
      }
    }

    return { ...exam, questions: [...Object.values(map)] };
  }

  /* UPDATE → só examName por enquanto */
  async update(sectionId: number, examId: number, dto: UpdateExamDTO) {
    await db
      .update(examTable)
      .set({ name: dto.examName })
      .where(
        and(eq(examTable.id, examId), eq(examTable.courseSection, sectionId)),
      );
    return this.findOne(sectionId, examId);
  }

  /* DELETE */
  async remove(sectionId: number, examId: number) {
    await db
      .delete(examTable)
      .where(
        and(eq(examTable.id, examId), eq(examTable.courseSection, sectionId)),
      );
  }
}
