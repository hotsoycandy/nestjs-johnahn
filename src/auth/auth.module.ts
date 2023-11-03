import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService],
})
export class AuthModule {}
