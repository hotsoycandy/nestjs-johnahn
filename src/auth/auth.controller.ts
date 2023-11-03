import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDTO: AuthCredentialDTO): Promise<User> {
    return this.authService.signUp(authCredentialDTO);
  }

  @Post('/signin')
  signIn(@Body() authCredentialDTO: AuthCredentialDTO): Promise<User> {
    return this.authService.signIn(authCredentialDTO);
  }
}
