import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import db from 'src/db';
import { material } from 'src/db/schema';

@Injectable()
export class ParseMaterialPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'number') {
      throw new BadRequestException('Value must be a number!');
    }

    const [dbmaterial] = await db
      .select()
      .from(material)
      .where(eq(material.id, value));

    if (!dbmaterial) {
      throw new NotFoundException('This material does not exist.');
    }
    return value;
  }
}
