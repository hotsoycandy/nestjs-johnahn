import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const CustomPassportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    CustomPassportModule,
    JwtModule.register({
      secret: '1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService, JwtStrategy],
  exports: [JwtStrategy, CustomPassportModule],
})
export class AuthModule {}
