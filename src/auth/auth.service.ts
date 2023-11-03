import * as crypto from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    return this.userRepository.createUser(authCredentialDTO);
  }

  async signIn(
    authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ user: User; token: string }> {
    const { username, password } = authCredentialDTO;

    const hashedPassword = crypto
      .createHash('sha512')
      .update(password + 'iamsalt')
      .digest('base64');

    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === hashedPassword) {
      const payload = { username };
      const token = this.jwtService.sign(payload);
      return { user, token };
    }

    throw new UnauthorizedException('login failed');
  }
}
