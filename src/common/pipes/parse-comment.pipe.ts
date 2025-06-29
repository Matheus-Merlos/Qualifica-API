import { Injectable } from '@nestjs/common';
import { comment } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseCommentPipe extends BaseParseEntityPipe {
  protected table = comment;
}
