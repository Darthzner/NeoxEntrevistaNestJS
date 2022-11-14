import { PrismaService } from '../../prisma/prisma.service';
import { Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt'


@Injectable()
export class DbUtils {
  constructor(private prisma: PrismaService) {}

  async hashPassword(pw: string): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(pw, salt);
    return hashPassword;
  }
  async findRol(rol: string): Promise<any> {
    console.log(rol)
    const idRol = await this.prisma.roles.findFirst({
        select: {
          id: true,
        },
        where: {
          rol_name: rol,
        },
      });
    return idRol.id;
  }

}