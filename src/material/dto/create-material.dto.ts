import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  courseSection: string;

  @IsString()
  @MaxLength(255)
  @MinLength(4)
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @Matches(
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i,
    { message: 'URL' },
  )
  url: string;

  @IsString()
  @MaxLength(511)
  description: string;
}
