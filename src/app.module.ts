import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExamModule } from './exam/exam.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
@Module({
  imports: [ExamModule, UserModule, ExamModule, CourseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
