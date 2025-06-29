import { Injectable, UseGuards } from '@nestjs/common';
import { eq, InferSelectModel } from 'drizzle-orm';
import db from 'src/db';
import { comment as commentModel, user as userModel } from 'src/db/schema';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
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

  //@Lazy
  async findAllByLesson(lessonId: number) {
    type CommentWithUserName = {
      id: number;
      user: string;
      content: string;
      created: Date | null;
    };
    let comments: Array<CommentWithUserName>;
    try {
      comments = await db
        .select({
          id: commentModel.id,
          user: userModel.name,
          content: commentModel.content,
          created: commentModel.creationTimestamp,
        })
        .from(commentModel)
        .where(eq(commentModel.sectionLesson, lessonId))
        .innerJoin(userModel, eq(userModel.id, commentModel.user));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
    return comments!;
  }

  async findChildsComment(commentId: number) {
    type ParentComment = {
      id: number;
      user: string;
      content: string;
      created: Date | null;
    };
    let comments: Array<ParentComment>;

    try {
      comments = await db
        .select({
          id: commentModel.id,
          user: userModel.name,
          content: commentModel.content,
          created: commentModel.creationTimestamp,
        })
        .from(commentModel)
        .where(eq(commentModel.parentComment, commentId))
        .innerJoin(userModel, eq(userModel.id, commentModel.user));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
    return comments!;
  }

  async update(commentId: number, updateDTO: UpdateCommentDTO) {
    let comment: InferSelectModel<typeof commentModel> | null = null;

    try {
      [comment] = await db
        .update(commentModel)
        .set({
          content: updateDTO.content,
        })
        .where(eq(commentModel.id, commentId))
        .returning();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

    return comment!;
  }

  async delete(commentId: number) {
    try {
      await db.delete(commentModel).where(eq(commentModel.id, commentId));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}
