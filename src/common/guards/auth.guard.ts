import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.TOKEN_SECRET!;

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers['authorization']!.split(' ') ?? [];

    if (type !== 'Bearer')
      throw new BadRequestException('Invalid type of authorization token');

    if (!token) throw new BadRequestException('Token not found');

    try {
      const payload = jwt.verify(token, this.jwtSecret);

      request['user'] = payload;
    } catch {
      throw new BadRequestException('Invalid authorization token');
    }

    return true;
  }
}
