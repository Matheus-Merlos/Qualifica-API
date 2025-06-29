import { Injectable } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import db from 'src/db';
import {
  alternative,
  course,
  courseSection,
  exam,
  lesson,
  material,
  ordination,
  progression,
  question,
  sectionExam,
  sectionLesson,
  sectionMaterial,
  studentAnswer,
} from 'src/db/schema';
import { ProgressDTO } from './progress.dto';

@Injectable()
export class ProgressService {
  async listCourseProgress(userId: number, courseId: number) {
    const [dbCourse] = await db
      .select()
      .from(course)
      .where(eq(course.id, courseId));

    const sections = await db
      .select()
      .from(courseSection)
      .where(eq(courseSection.course, courseId))
      .orderBy(asc(courseSection.order));

    const courseWithSections = {
      ...dbCourse,
      sections,
    };

    let index = 0;
    for (const sect of courseWithSections.sections) {
      const resources: Array<unknown> = [];
      const sectionWithResources = { ...sect, resources };

      const orders = await db
        .select({
          sectionLessonId: sectionLesson.id,
          lessonId: sectionLesson.lesson,
          materialId: sectionMaterial.material,
          examId: sectionExam.exam,
        })
        .from(ordination)
        .leftJoin(sectionLesson, eq(ordination.sectionLesson, sectionLesson.id))
        .leftJoin(sectionExam, eq(ordination.sectionExam, sectionExam.id))
        .leftJoin(
          sectionMaterial,
          eq(ordination.sectionMaterial, sectionMaterial.id),
        )
        .where(eq(ordination.courseSection, sect.id))
        .orderBy(asc(ordination.order));

      for (const order of orders) {
        const { lessonId, materialId, examId } = order;

        if (lessonId !== null) {
          const [dbLesson] = await db
            .select()
            .from(lesson)
            .where(eq(lesson.id, lessonId));

          const requiredProgress = dbLesson.duration * 0.9;
          const [currentUserProgress] = await db
            .select()
            .from(progression)
            .where(
              and(
                eq(progression.sectionLesson, order.sectionLessonId!),
                eq(progression.user, userId),
              ),
            );

          const timeWatched = currentUserProgress?.timedWatched ?? 0;

          const hasCompletedLesson = timeWatched > requiredProgress;
          sectionWithResources.resources.push({
            type: 'lesson',
            completed: hasCompletedLesson,
            content: dbLesson,
          });
        }

        if (materialId !== null) {
          const [dbMaterial] = await db
            .select()
            .from(material)
            .where(eq(material.id, materialId));
          sectionWithResources.resources.push({
            type: 'material',
            content: dbMaterial,
          });
        }

        if (examId !== null) {
          const [dbExam] = await db
            .select()
            .from(exam)
            .where(eq(exam.id, examId));

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
            .innerJoin(
              alternative,
              eq(studentAnswer.alternative, alternative.id),
            )
            .where(
              and(
                eq(studentAnswer.user, userId),
                eq(studentAnswer.exam, dbExam.id),
              ),
            );

          const weightByQuestion = 10 / questionsWithAnswers.length;
          let correctAnswers = 0;
          questionsWithAnswers.forEach((question) => {
            if (question.answeredCorrectly) {
              correctAnswers++;
            }
          });
          const finalScore = correctAnswers * weightByQuestion;

          const hasCompletedExam = finalScore >= 6;

          sectionWithResources.resources.push({
            type: 'exam',
            completed: hasCompletedExam,
            content: dbExam,
          });
        }
      }
      courseWithSections.sections[index] = sectionWithResources;
      index++;
    }

    return courseWithSections;
  }

  async getLessonProgress(userId: number, lessonId: number) {
    const [progress] = await db
      .select()
      .from(progression)
      .where(
        and(
          eq(progression.user, userId),
          eq(progression.sectionLesson, lessonId),
        ),
      );

    return { timeWatched: progress.timedWatched };
  }

  async edit(userId: number, lessonId: number, dto: ProgressDTO) {
    const parts = dto.time.split(':').map(Number);

    let totalSeconds = 0;

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      totalSeconds = minutes * 60 + seconds;
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    await db
      .update(progression)
      .set({ timedWatched: totalSeconds })
      .where(
        and(
          eq(progression.sectionLesson, lessonId),
          eq(progression.user, userId),
        ),
      );
  }
}
