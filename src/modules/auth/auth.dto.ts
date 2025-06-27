import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MaxLength(255)
  @MinLength(8)
  @Matches(/^(\w+\s+\w+.*)$/, {
    message: 'Name must contain at least two words',
  })
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'birthdate must be in the format YYYY-MM-DD',
  })
  birthdate: string;

  @IsString()
  @IsOptional()
  bio: string;
}

export class LoginDTO {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  password: string;
}

export class ForgotPasswordDTO {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  password: string;
}
