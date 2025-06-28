import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable({ scope: Scope.REQUEST })
export class IsUserPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { authorization } = this.request.headers;
    if (!authorization || authorization === undefined) {
      throw new BadRequestException(
        "Required header 'authorization' not found in request",
      );
    }

    if (typeof value !== 'number') {
      throw new BadRequestException(`${metadata.data} must be a number!`);
    }

    const [, token] = authorization.split(' ');

    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET!,
    ) as jwt.JwtPayload & { id?: number };

    if (payload.id !== value) {
      throw new UnauthorizedException(
        'User not authorized to access this resource',
      );
    }

    return value;
  }
}
