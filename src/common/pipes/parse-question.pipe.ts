import { Injectable } from '@nestjs/common';
import { question } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseQuestionPipe extends BaseParseEntityPipe {
  protected table = question;
}
