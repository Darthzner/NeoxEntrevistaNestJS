import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { format, parse, parseISO } from 'date-fns';
import { CreateUser, BlockUser } from './dtos/user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { users as Users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(body: CreateUser): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(body.password, salt);
      const idRol = await this.prisma.roles.findFirst({
        where: {
          rol_name: body.rol,
        },
      });
      await this.prisma.users.create({
        data: {
          user_id: body.email,
          user_password: hashPassword,
          rol_id: idRol.id,
          user_name: body.name,
        },
        
      });
      return "Usuario creado con exito"
      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async blockUser(body: BlockUser): Promise<any> {
    try {
      
      const user_db = await this.prisma.users.update({
        data: {
          is_activate: false,
        },
        where: {
          user_id: body.email
        }
      });
      return "Usuario bloqueado con exito"
      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async listUsers(): Promise<any> {
    try {
      
      const users_db = await this.prisma.users.findMany({
        select: {
          user_name: true,
          user_id: true,
          roles: {
            select: {
              rol_name: true,
            }
          }
        },
        where: {
          is_activate: true,
        },
      });
      return users_db;
      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
