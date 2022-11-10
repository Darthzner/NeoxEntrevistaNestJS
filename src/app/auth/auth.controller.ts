import * as bycript from 'bcrypt';
import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth.dto';
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post('/login')
  async login(@Body() body: LoginDto) {
    try {
      const token = await this.AuthService.login(body);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
