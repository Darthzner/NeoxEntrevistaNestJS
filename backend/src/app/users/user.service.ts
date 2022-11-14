import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { format, parse, parseISO } from 'date-fns';
import { CreateUser, BlockUser } from './dtos/user.dto';
import { DbUtils } from '../utils/db.utils';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { users as Users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private dbUtils: DbUtils) {}
  async createUser(body: CreateUser): Promise<any> {
    try {      
      const hashPassword = await this.dbUtils.hashPassword(body.password);    
      const idRol = await this.dbUtils.findRol(body.rol)    
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

  async updateUser(body: CreateUser): Promise<any> {
    try {            
      const idRol = await this.dbUtils.findRol(body.rol)
      const user_db = await this.prisma.users.update({
        data: {
          user_id: body.email,          
          user_name: body.name,
          rol_id: idRol,
        },
        where: {
          user_id: body.email
        }
      });
      return "Usuario Actualizado con Exito"
      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
