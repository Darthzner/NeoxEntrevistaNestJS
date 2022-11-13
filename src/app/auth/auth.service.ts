import { Injectable, HttpException, OnApplicationShutdown } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto, Recovery } from './dtos/auth.dto';
import { users as User } from '@prisma/client';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnApplicationShutdown {
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  
  async login(body: LoginDto): Promise<any> {
    try {
      const user_db = await this.prisma.users.findFirst({
        select: {
          user_name: true,
          user_id: true,
          user_password: true,
          roles: {
            select: {
              rol_name: true,
            },
          },
          is_activate: true,
        },
        where: {
          user_id: body.user,          
        },
      });
      console.log(user_db)
      if (user_db) {
        if (!user_db.is_activate){
          throw new HttpException('Usuario se encuentra bloqueado', HttpStatus.BAD_REQUEST);
        }
        const passwordMatch = await bcrypt.compare(
          body.password,
          user_db.user_password,
        );
        if (passwordMatch){
          const payload = { user: {
            email: user_db.user_id,
            username: user_db.user_name,
            rol: user_db.roles.rol_name,
          }, validate: true };
          return {
            token: this.jwtService.sign(payload),
          };
        } else {
          throw new HttpException('Contraseña Incorrecta', HttpStatus.BAD_REQUEST);         
        }
        
      } else {        
        
          throw new HttpException("Usuario no Existente", HttpStatus.BAD_REQUEST);             
        
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
      console.log(idRol)
      const response = await this.prisma.users.create({
        
        data: {
          user_id: body.user,
          user_password: hashedPassword,
          user_name: body.name,
          rol_id: idRol.id,
          
        },
      });
      return response;
    } catch (error) {
      console.log(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);      
      
    }
  }  

  async recoveryWithCode(body: Recovery): Promise<String> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          user_id: body.user,
        }
      })
      if (user) {
        if (body.newPassword !== body.confirmNewPassword) {
          throw new HttpException('Ambas contraseñas deben ser iguales', HttpStatus.BAD_REQUEST);          
        }
        if (user.secret_code !== '' && user.secret_code === body.code){
          const salt = await bcrypt.genSalt();
          const newPassword = await bcrypt.hash(body.newPassword, salt);
          await this.prisma.users.update({
            data: {
              user_password: newPassword,
              secret_code: '',
            },
            where: {
              user_id: body.user,
            },
          })
          return "Password cambiada con exito, favor vuelva a iniciar sesión"
        }
        else {
          throw new HttpException('Codigo secreto incorrecto', HttpStatus.BAD_REQUEST);
        }
      }
      else {
        throw new HttpException('Usuario no Existente', HttpStatus.BAD_REQUEST);        
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);    
      
    }
  }  
}
