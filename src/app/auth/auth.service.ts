import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { users as User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async login(body: LoginDto): Promise<any> {
    try {
      const user_db = await this.prisma.users.findUnique({
        where: {
          user: body.user,
        },
      });
      if (user_db) {
        const passwordMatch = await bcrypt.compare(
          body.password,
          user_db.password,
        );
        if (passwordMatch){
          const payload = { user: user_db, validate: true };
          return {
            token: this.jwtService.sign(payload),
          };
        } else {
          return 'Contraseña Incorrecta';
        }
        
      } else {        
        return {
          message: "Usuario no Existente",
        };
      };
    } catch (error) {
      return error;
    }
  }
  async register(body: RegisterDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.password, salt);
      const idRol = await this.prisma.roles.findFirst({
        select: {
          id: true,
        },
        where: {
          rol_name: {
            contains: body.rol,
          },
        },
      });
      await this.prisma.users.create({
        data: {
          user: body.user,
          password: hashedPassword,
          rol_id: idRol.id,
        },
      });
      return;
    } catch (error) {
      return error;
      console.log(error)
    }
  }
}
