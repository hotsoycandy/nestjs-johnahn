import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDTO: AuthCredentialDTO): Promise<User> {
    return this.authService.signUp(authCredentialDTO);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ user: User; token: string }> {
    return this.authService.signIn(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
