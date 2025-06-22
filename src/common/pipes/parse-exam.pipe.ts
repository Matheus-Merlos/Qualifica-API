import { Injectable } from '@nestjs/common';
import { exam } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseExamPipe extends BaseParseEntityPipe {
  protected table = exam;
}
