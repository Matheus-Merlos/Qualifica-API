import { Injectable } from '@nestjs/common';
import { InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import { comment as commentModel } from 'src/db/schema';
import { CreateCommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  async create(
    lessonId: number,
    userId: number,
    createCommentDTO: CreateCommentDTO,
  ) {
    let comment: InferSelectModel<typeof commentModel> | null = null;
    try {
      [comment] = await db
        .insert(commentModel)
        .values({
          sectionLesson: lessonId,
          user: userId,
          content: createCommentDTO.content,
        })
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
    return comment!;
  }

  async createReply(
    lessonId: number,
    userId: number,
    parrentCommentId: number,
    createCommentDTO: CreateCommentDTO,
  ) {
    let reply: InferSelectModel<typeof commentModel> | null = null;
    try {
      [reply] = await db
        .insert(commentModel)
        .values({
          sectionLesson: lessonId,
          user: userId,
          content: createCommentDTO.content,
          parentComment: parrentCommentId,
        })
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
    return reply!;
  }

  async findAllByLesson(lessonId: number){

    


  }
}
