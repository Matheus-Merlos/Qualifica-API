import { Injectable } from '@nestjs/common';
import { lesson } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseLessonPipe extends BaseParseEntityPipe {
  protected table = lesson;
}
