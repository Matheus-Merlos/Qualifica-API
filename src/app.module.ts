import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExamModule } from './exam/exam.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [ExamModule, UserModule, ExamModule, MaterialModule, CourseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
