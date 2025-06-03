import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { AlternativeDto } from './alternative.dto';

export class QuestionDto {
  @IsString()
  question: string;

  @ValidateNested({ each: true })
  @Type(() => AlternativeDto)
  alternatives: AlternativeDto[];
}
