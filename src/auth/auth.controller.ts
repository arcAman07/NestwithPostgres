import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUser } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() registerUserinfo: registerUser): Promise<void> {
    return this.authService.signUp(registerUserinfo);
  }
  @Post('/signIn')
  signIn(
    @Body() registerUserinfo: registerUser,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(registerUserinfo);
  }
}
