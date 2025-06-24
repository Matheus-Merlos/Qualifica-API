import { IsString, Matches } from 'class-validator';

export class ProgressDTO {
  @Matches(/^(\d{2}:\d{2}:\d{2}|\d{2}:\d{2})$/, {
    message: 'The field must be in format HH:MM:SS ou MM:SS',
  })
  @IsString()
  time: string;
}
