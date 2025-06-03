import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { QuestionDto } from './question.dto';

export class CreateExamDto {
  @IsString()
  examName!: string;

  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions!: QuestionDto[];
}
