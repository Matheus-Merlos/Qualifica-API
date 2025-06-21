import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class AnswerDTO {
  @IsNumber()
  @IsInt()
  @IsPositive()
  alternative: number;
}
