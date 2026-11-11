import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './dto/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '../generated/prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verifyUser(email, password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() + parseInt(this.configService.getOrThrow('JWT_EXPIRY_IN_MS')),
    );
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires,
    });
    return user;
  }
  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password here

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma Error Code:', error.code);
        console.error('Prisma Error Message:', error.message);
        console.error('Prisma Error Meta:', error.meta);
      } else {
        console.error('Unknown Error:', error);
      }

      throw error;
    }
  }
}
