import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { format, parse, parseISO } from 'date-fns';
import { ListUsers, CreateUser } from './dtos/user.dto';
import { Prisma } from '@prisma/client';
import { users as Users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
}
