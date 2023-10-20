import { Controller, Post, Body, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
