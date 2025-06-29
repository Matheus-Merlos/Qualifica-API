import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnswersModule } from './modules/answers/answers.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { ExamModule } from './modules/exam/exam.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { MaterialModule } from './modules/material/material.module';
import { ProgressModule } from './modules/progress/progress.module';
import { SectionModule } from './modules/section/section.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { CommentModule } from './modules/comment/comment.module';
import { AwsModule } from './modules/aws/aws.module';

@Module({
  imports: [
    LessonModule,
    ExamModule,
    AuthModule,
    MaterialModule,
    CourseModule,
    SectionModule,
    SubscriptionModule,
    AnswersModule,
    ProgressModule,
    CommentModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
