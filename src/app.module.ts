import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CourseModule } from './course/course.module';
import { ExamModule } from './exam/exam.module';
import { SectionModule } from './section/section.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ExamModule, UserModule, ExamModule, CourseModule, SectionModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
