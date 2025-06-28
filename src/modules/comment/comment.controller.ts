import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ParseCommentPipe } from 'src/common/pipes/parse-comment.pipe';
import { ParseLessonPipe } from 'src/common/pipes/parse-lesson.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateCommentDTO, ReplyCommentDTO } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('/:lessonId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) lessonId: number,
    @Body('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() createCommentDTO: CreateCommentDTO,
  ) {
    return this.commentService.create(lessonId, userId, createCommentDTO);
  }

  @Post('/reply')
  createReply(
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) lessonId: number,
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

  @Get()
  findAllByLesson(
    @Param('lessonId', ParseIntPipe, ParseLessonPipe) lessonId: number,
  ) {
    return this.commentService.findAllByLesson();
  }

}
