import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @IsUrl()
  url: string;

  duration: string;

  @IsString()
  @MaxLength(511)
  description: string;
}

export class ProgressDto {
  @IsBoolean()
  completed: boolean;

  @IsString()
  idLesson: string;

  @IsString()
  idUser: string;

  @IsNumber()
  currentTime: number; //seconds
}
