import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class AlternativeDTO {
  @IsString()
  @MaxLength(511)
  description: string;

  @IsBoolean()
  isTrue: boolean;
}

class QuestionDTO {
  @IsString()
  @MaxLength(511)
  question: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AlternativeDTO)
  alternatives: Array<AlternativeDTO>;
}

export class CreateExamDTO {
  @IsString()
  @MaxLength(511)
  name: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDTO)
  questions: Array<QuestionDTO>;
}

export class UpdateExamDTO extends PartialType(CreateExamDTO) {}
