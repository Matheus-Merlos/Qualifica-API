import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (
          error instanceof BadRequestException ||
          error instanceof NotFoundException ||
          error instanceof ConflictException ||
          error instanceof UnauthorizedException
        ) {
          return throwError(() => error);
        }
        console.error(error);

        return throwError(
          () =>
            new InternalServerErrorException(
              `The server encountered an error: ${(error as Error).message}`,
            ),
        );
      }),
    );
  }
}
