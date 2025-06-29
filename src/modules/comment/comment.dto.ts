import { PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCommentDTO {
  @IsNumber()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsString()
  @MaxLength(511)
  content: string;
}

export class ReplyCommentDTO {
  @IsNumber()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsString()
  @MaxLength(511)
  content: string;

  @IsString()
  @MaxLength(511)
  @IsOptional()
  parentId: string;
}

export class UpdateCommentDTO extends PartialType(ReplyCommentDTO) {}
