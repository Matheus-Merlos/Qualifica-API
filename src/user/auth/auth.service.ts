import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { InferSelectModel, eq } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';
import db from 'src/db';
import { user as userModel } from '../../db/schema';
import { LoginDTO, RegisterDTO } from './auth.dto';
import {
  UserExistsException,
  UserNotFoundException,
  WrongPasswordException,
} from './auth.exceptions';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.TOKEN_SECRET!;

  async register(request: RegisterDTO) {
    let user: InferSelectModel<typeof userModel>;

    const salt = this.createSalt();

    const { name, email, birthdate, bio } = request;

    try {
      [user] = await db
        .insert(userModel)
        .values({
          name,
          email,
          salt,
          passwordHash: this.digest(`${salt}${request.password}`),
          birthdate,
          bio,
        })
        .returning();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.toUpperCase().includes('UNIQUE')) {
          throw new UserExistsException();
        }
        throw new Error(error.message);
      }
    }

    return user!;
  }

  async login(request: LoginDTO) {
    const [user] = await db
      .select()
      .from(userModel)
      .where(eq(userModel.email, request.email));

    if (!user) throw new UserNotFoundException();

    const passwordWithSalt = this.digest(`${user.salt}${request.password}`);

    if (passwordWithSalt !== user.passwordHash)
      throw new WrongPasswordException();

    const token = jwt.sign(user, this.jwtSecret, { expiresIn: '30d' });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, salt, ...userReturn } = user;

    return { ...userReturn, token };
  }

  private digest(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }
  private createSalt(lenght: number = 16): string {
    return randomBytes(lenght).toString('hex').substring(0, lenght);
  }
}
