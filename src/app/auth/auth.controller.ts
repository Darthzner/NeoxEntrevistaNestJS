import * as bycript from 'bcrypt';
import { Controller, Get, Post, Body, Session, HttpStatus, Res, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, Recovery } from './dtos/auth.dto';
import { Response } from 'express';
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
  };

  @Post('/register')  
  async register(@Body() body: RegisterDto) {
    try {
      const response = await this.AuthService.register(body);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post('/security-code')  
  async securityCode(@Body() body: Recovery, @Res() res: Response) {
    try {
      const response = await this.AuthService.recoveryWithCode(body);
      throw new HttpException(response, HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  };

  @Get('/hello')
  async hello(@Res() response: Response) {
    try {      
        return response.status(HttpStatus.OK)
    } catch (error) {
      throw error;
    }
  }
}
