import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnswersModule } from './modules/answers/answers.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { ExamModule } from './modules/exam/exam.module';
import { MaterialModule } from './modules/material/material.module';
import { ProgressModule } from './modules/progress/progress.module';
import { SectionModule } from './modules/section/section.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [
    ExamModule,
    AuthModule,
    MaterialModule,
    CourseModule,
    SectionModule,
    SubscriptionModule,
    AnswersModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
