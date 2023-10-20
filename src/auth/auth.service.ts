import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async signup(signupDto: SignUpDto) {
    const existingUser = await this.usersService.findByUsername(
      signupDto.username,
    );
    if (existingUser?.username === signupDto.username)
      throw new ConflictException('User with this username already exists');
    const user = await this.usersService.create(signupDto);
    const token = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });
    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user)
      throw new NotFoundException('There is no user with this username');
    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!user || !isPasswordCorrect)
      throw new UnauthorizedException('password is not correct');
    const token = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });
    return { token };
  }
}
