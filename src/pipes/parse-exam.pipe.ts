import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import db from 'src/db';
import { exam } from 'src/db/schema';

@Injectable()
export class ParseExamPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'number') {
      throw new BadRequestException('Value must be a number!');
    }

    const [dbExam] = await db.select().from(exam).where(eq(exam.id, value));

    if (!dbExam) {
      throw new NotFoundException('This exam does not exist.');
    }
    return value;
  }
}
