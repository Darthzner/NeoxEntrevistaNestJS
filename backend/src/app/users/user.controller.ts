import { Controller, Get, Post, Body, Session, UseGuards, Request, HttpStatus, Res, HttpException, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { CreateUser, BlockUser } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { setEngine } from 'crypto';
@UseGuards(JwtAuthGuard)
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')  

  async create(@Request() req: any, @Body() body: CreateUser) {
    try {
      console.log(req.user)
      if (req.user.user.rol === 'ADMIN'){
        const response = await this.userService.createUser(body);
        throw new HttpException(response, HttpStatus.OK);
      }
      else {
        throw new HttpException("Usuario no Admin", HttpStatus.BAD_REQUEST);
      }
      //
      //return response;
    } catch (error) {
      throw error;
    }
  }
  @Post('/block')  
  async block(@Request() req: any, @Body() body: BlockUser) {
    try {
      console.log(req.user.user.rol)
      if (req.user.user.rol === 'ADMIN'){
        const response = await this.userService.blockUser(body);
        throw new HttpException(response, HttpStatus.OK);
      }
      else {
        throw new HttpException("Usuario no Admin", HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }
  @Get('/list')  
  async list() {
    try {
      const response = await this.userService.listUsers();      
      return response;
    } catch (error) {
      throw error;
    }
  }
  @Patch('/update')  
  async update(@Request() req: any, @Body() body: CreateUser) {
    try {      
      if (req.user.user.rol === 'ADMIN'){
        const response = await this.userService.updateUser(body);      
        throw new HttpException(response, HttpStatus.OK);
      }
      else {
        throw new HttpException("Usuario no Admin", HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }
}
