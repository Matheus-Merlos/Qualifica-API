import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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
    const [exam] = await db
      .insert(examTable)
      .values({ courseSection: sectionId, name: dto.examName })
      .returning();

    for (const q of dto.questions) {
      const [question] = await db
        .insert(questionTable)
        .values({ examId: exam.id, text: q.question })
        .returning();

      const altRows = q.alternatives.map((a) => ({
        questionId: question.id,
        description: a.description,
        isTrue: a.isTrue,
      }));
      await db.insert(alternativeTable).values(altRows);
    }

    return { id: exam.id };
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
      )
      .limit(1);

    if (!exam) throw new NotFoundException('Exam not found');

    const rows = await db
      .select({
        qId: questionTable.id,
        question: questionTable.text,
        aId: alternativeTable.id,
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
    const map = new Map<number, any>();
    for (const r of rows) {
      if (!map.has(r.qId)) {
        map.set(r.qId, {
          questionId: r.qId,
          question: r.question,
          alternatives: [],
        });
      }
      if (r.aId) {
        map.get(r.qId).alternatives.push({
          id: r.aId,
          description: r.description,
          isTrue: r.isTrue,
        });
      }
    }

    return { ...exam, questions: [...map.values()] };
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
    return { deleted: true };
  }
}
