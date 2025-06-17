import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import db from 'src/db';
import { courseSection } from 'src/db/schema';

@Injectable()
export class ParseSectionPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'number') {
      throw new BadRequestException('Value must be a number!');
    }

    const [section] = await db
      .select()
      .from(courseSection)
      .where(eq(courseSection.id, value));

    if (!section) {
      throw new NotFoundException('This section does not exist.');
    }

    return value;
  }
}
