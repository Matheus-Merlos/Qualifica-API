import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { AnswersModule } from './answers/answers.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
  imports: [AnswersModule],
})
export class ExamModule {}
