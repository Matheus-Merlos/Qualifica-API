import { Injectable } from '@nestjs/common';
import { course } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseCoursePipe extends BaseParseEntityPipe {
  protected table = course;
}
