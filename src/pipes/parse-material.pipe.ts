import { Injectable } from '@nestjs/common';
import { material } from 'src/db/schema';
import { BaseParseEntityPipe } from './parse-entity-pipe';

@Injectable()
export class ParseMaterialPipe extends BaseParseEntityPipe {
  protected table = material;
}
