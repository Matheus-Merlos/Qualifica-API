import {
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { Column, eq, getTableName } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import db from 'src/db';

export abstract class BaseParseEntityPipe implements PipeTransform {
  protected table: PgTable & { id: Column<any> };

  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'number') {
      throw new BadRequestException(
        `${metadata.metatype?.name} must be a number!`,
      );
    }

    const [entity] = await db
      .select()
      .from(this.table)
      .where(eq(this.table.id, value));

    if (!entity) {
      throw new NotFoundException(
        `${getTableName(this.table)} with id ${value} does not exists.`,
      );
    }

    return value;
  }
}
