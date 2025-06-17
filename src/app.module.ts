import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExamModule } from './exam/exam.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ExamModule, UserModule, ExamModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
