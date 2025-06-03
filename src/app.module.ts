import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { ExamModule } from './exam/exam.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [DatabaseModule, ExamModule, UserModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
