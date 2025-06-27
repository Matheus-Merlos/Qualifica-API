import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
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

  @IsString()
  duration: string;

  @IsString()
  @MaxLength(511)
  description: string;
}

export class UpdateLessonDTO extends PartialType(CreateLessonDTO) {}

export class ProgressDTO {
  @IsBoolean()
  completed: boolean;

  @IsString()
  idLesson: string;

  @IsString()
  idUser: string;

  @IsNumber()
  currentTime: number; //seconds
}
