import { Injectable } from '@nestjs/common';
import { sectionLesson } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseSectionLesson extends BaseParseEntityPipe {
  protected table = sectionLesson;
}
