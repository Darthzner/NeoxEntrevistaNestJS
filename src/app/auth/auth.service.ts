import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async login(body: LoginDto): Promise<any> {
    try {    
      
      const user_db = await this.prisma.users.findUnique({
        where: {
          user: body.user,
        }
      });
      if (user_db) {
        const payload = { user: user_db, validate: true };
        return {
          token: this.jwtService.sign(payload),
        };
      } else {        
        return {
          message: "Usuario no Existente",
        };
      }
     
    } catch (error) {
      return error;
    }
  }
}
