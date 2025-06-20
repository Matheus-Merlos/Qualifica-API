import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export enum Resource {
  LESSON = 'lesson',
  MATERIAL = 'material',
  EXAM = 'exam',
}

class ResourceDTO {
  @IsString()
  @IsEnum(Resource)
  @IsNotEmpty()
  type: Resource;

  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceId: number;
}

export class CreateSectionDTO {
  @IsString()
  @MaxLength(511)
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ResourceDTO)
  resources: Array<ResourceDTO>;

  @IsNumber()
  @IsInt()
  @IsPositive()
  order: number;
}

export class PatchSectionDTO extends PartialType(CreateSectionDTO) {}
