import * as crypto from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    return this.userRepository.createUser(authCredentialDTO);
  }

  async signIn(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    const { username, password } = authCredentialDTO;

    const hashedPassword = crypto
      .createHash('sha512')
      .update(password + 'iamsalt')
      .digest('base64');

    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === hashedPassword) {
      return user;
    }

    throw new UnauthorizedException('login failed');
  }
}
