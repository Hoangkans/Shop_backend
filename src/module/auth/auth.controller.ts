import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, TokenResponse } from './auth.service';
import { AuthDto, LoginDto } from 'src/shared/database/mongo/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDto): Promise<TokenResponse> {
    return this.authService.register(authDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return this.authService.login(loginDto);
  }
}
