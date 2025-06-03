import { IsBoolean, IsString } from 'class-validator';

export class AlternativeDto {
  @IsString()
  description!: string;

  @IsBoolean()
  isTrue!: boolean;
}
