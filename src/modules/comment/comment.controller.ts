import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseCommentPipe } from 'src/common/pipes/parse-comment.pipe';
import { ParseSectionLesson } from 'src/common/pipes/parse-section-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import {
  CreateCommentDTO,
  ReplyCommentDTO,
  UpdateCommentDTO,
} from './comment.dto';
import { CommentService } from './comment.service';

@Controller('/comment/:lessonId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
    @Body('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() createCommentDTO: CreateCommentDTO,
  ) {
    return this.commentService.create(lessonId, userId, createCommentDTO);
  }

  @Post('/reply')
  createReply(
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
    @Body('parrentComment', ParseIntPipe, ParseCommentPipe)
    parrentCommentId: number,
    @Body('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() replyCommentDTO: ReplyCommentDTO,
  ) {
    return this.commentService.createReply(
      lessonId,
      parrentCommentId,
      userId,
      replyCommentDTO,
    );
  }

  @Get('/comment')
  findAllByLesson(
    @Param('lessonId', ParseIntPipe, ParseSectionLesson) lessonId: number,
  ) {
    return this.commentService.findAllByLesson(lessonId);
  }

  @Get('/:comment')
  findChilds(
    @Param('comment', ParseIntPipe, ParseCommentPipe) commentId: number,
  ) {
    return this.commentService.findChildsComment(commentId);
  }

  @Patch()
  update(
    @Body('comment', ParseIntPipe, ParseCommentPipe) commentId: number,
    @Body() updateDTO: UpdateCommentDTO,
  ) {
    return this.commentService.update(commentId, updateDTO);
  }

  @Delete('/:userId/:commentId')
  delete(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('commentId', ParseIntPipe, ParseCommentPipe) commentId: number,
  ) {
    return this.commentService.delete(commentId);
  }
}
