import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

class CreateCourseDTO {
  @IsString()
  @MaxLength(512)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsOptional()
  tags: Array<string>;
}

export { CreateCourseDTO };
