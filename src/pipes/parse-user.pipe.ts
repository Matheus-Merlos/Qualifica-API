import { Injectable } from '@nestjs/common';
import { user } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseUserPipe extends BaseParseEntityPipe {
  protected table = user;
}
