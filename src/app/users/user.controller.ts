import { Controller, Get, Post, Body, Session, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ListUsers, CreateUser } from './dtos/user.dto';
import { users as Users } from '@prisma/client';
@UseGuards(JwtAuthGuard)
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
