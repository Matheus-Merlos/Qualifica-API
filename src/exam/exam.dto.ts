import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';

export class AlternativeDTO {
  @IsString()
  description: string;

  @IsBoolean()
  isTrue: boolean;
}

export class CreateExamDTO {
  @IsString()
  examName: string;

  @ValidateNested({ each: true })
  @Type(() => QuestionDTO)
  questions: QuestionDTO[];
}

export class QuestionDTO {
  @IsString()
  question: string;

  @ValidateNested({ each: true })
  @Type(() => AlternativeDTO)
  alternatives: AlternativeDTO[];
}

export class UpdateExamDTO extends PartialType(CreateExamDTO) {}
