import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLessonDTO {
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @IsUrl()
  url: string;

  @Matches(/^(\d{2}:\d{2}:\d{2}|\d{2}:\d{2})$/, {
    message: 'The field must be in format HH:MM:SS ou MM:SS',
  })
  @IsString()
  duration: string;

  @IsString()
  @MaxLength(511)
  description: string;
}

export class UpdateLessonDTO extends PartialType(CreateLessonDTO) {}
