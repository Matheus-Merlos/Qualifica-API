import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnswersModule } from './modules/answers/answers.module';
import { CourseModule } from './modules/course/course.module';
import { ExamModule } from './modules/exam/exam.module';
import { MaterialModule } from './modules/material/material.module';
import { SectionModule } from './modules/section/section.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ExamModule,
    UserModule,
    ExamModule,
    MaterialModule,
    CourseModule,
    SectionModule,
    SubscriptionModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
