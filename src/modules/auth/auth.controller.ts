import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ForgotPasswordDTO, LoginDTO, RegisterDTO } from './auth.dto';
import {
  UserExistsException,
  UserNotFoundException,
  WrongPasswordException,
} from './auth.exceptions';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      if (error instanceof UserExistsException)
        throw new ConflictException('User with this e-mail already exists.');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new NotFoundException('User not found.');
      if (error instanceof WrongPasswordException)
        throw new BadRequestException('Wrong password.');
    }
  }

  @Post('forgotPassword')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDTO) {
    return await this.authService.forgotPassword(dto);
  }
}
