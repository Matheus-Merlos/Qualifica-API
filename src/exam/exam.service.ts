import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE } from '../db/database.module';
import {
  alternativeTable,
  examTable,
  questionTable,
} from '../db/schema';
import { CreateExamDto, UpdateExamDto } from './dto';

@Injectable()
export class ExamService {
  constructor(@Inject(DRIZZLE) private db: any) {}

  /* CREATE */
  async create(sectionId: number, dto: CreateExamDto) {
    const [exam] = await this.db
      .insert(examTable)
      .values({ sectionId, name: dto.examName })
      .returning();

    for (const q of dto.questions) {
      const [question] = await this.db
        .insert(questionTable)
        .values({ examId: exam.id, text: q.question })
        .returning();

      const altRows = q.alternatives.map((a) => ({
        questionId: question.id,
        description: a.description,
        isTrue: a.isTrue,
      }));
      await this.db.insert(alternativeTable).values(altRows);
    }

    return { id: exam.id };
  }

  /* READ → all exams for a section */
  findAllBySection(sectionId: number) {
    return this.db
      .select()
      .from(examTable)
      .where(eq(examTable.sectionId, sectionId));
  }

  /* READ → one exam with questions + alternatives */
  async findOne(sectionId: number, examId: number) {
    const [exam] = await this.db
      .select()
      .from(examTable)
      .where(and(eq(examTable.id, examId), eq(examTable.sectionId, sectionId)))
      .limit(1);

    if (!exam) throw new NotFoundException('Exam not found');

    const rows = await this.db
      .select({
        qId: questionTable.id,
        question: questionTable.text,
        aId: alternativeTable.id,
        description: alternativeTable.description,
        isTrue: alternativeTable.isTrue,
      })
      .from(questionTable)
      .leftJoin(alternativeTable, eq(alternativeTable.questionId, questionTable.id))
      .where(eq(questionTable.examId, examId));

    // agrega alternativas por questão
    const map = new Map<number, any>();
    for (const r of rows) {
      if (!map.has(r.qId)) {
        map.set(r.qId, { questionId: r.qId, question: r.question, alternatives: [] });
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
  async update(sectionId: number, examId: number, dto: UpdateExamDto) {
    await this.db
      .update(examTable)
      .set({ name: dto.examName })
      .where(and(eq(examTable.id, examId), eq(examTable.sectionId, sectionId)));
    return this.findOne(sectionId, examId);
  }

  /* DELETE */
  async remove(sectionId: number, examId: number) {
    await this.db
      .delete(examTable)
      .where(and(eq(examTable.id, examId), eq(examTable.sectionId, sectionId)));
    return { deleted: true };
  }
}
