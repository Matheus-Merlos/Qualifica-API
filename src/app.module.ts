import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CourseModule } from './modules/course/course.module';
import { ExamModule } from './modules/exam/exam.module';
import { MaterialModule } from './modules/material/material.module';
import { SectionModule } from './modules/section/section.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ExamModule,
    UserModule,
    ExamModule,
    MaterialModule,
    CourseModule,
    SectionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
