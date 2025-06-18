import { Injectable } from '@nestjs/common';
import { courseSection } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseSectionPipe extends BaseParseEntityPipe {
  protected table = courseSection;
}
