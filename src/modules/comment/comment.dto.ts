import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  userId: string;

  @IsString()
  @MaxLength(511)
  content: string;
}

export class ReplyCommentDTO {
  @IsString()
  userId: string;

  @IsString()
  @MaxLength(511)
  content: string;

  @IsString()
  @MaxLength(511)
  @IsOptional()
  parentId: string;
}

export class UpdateReplyDTO extends PartialType(ReplyCommentDTO) {}
