import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class SubscriptionDTO {
  @IsInt()
  @IsNumber()
  @IsPositive()
  courseId: number;
}
