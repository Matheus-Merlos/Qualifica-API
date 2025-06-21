import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateMaterialDto {
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
  @MaxLength(511)
  description: string;
}

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}
