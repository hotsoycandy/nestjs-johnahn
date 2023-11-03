import * as crypto from 'crypto';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    const repository = dataSource.getRepository(User);
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(authCredentialDTO: AuthCredentialDTO): Promise<User> {
    try {
      const { username, password } = authCredentialDTO;

      const hashedPassword = crypto
        .createHash('sha512')
        .update(password + 'iamsalt')
        .digest('base64');

      const user = this.create({ username, password: hashedPassword });
      await this.save(user);
      return user;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username');
      }
      throw err;
    }
  }
}
