import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  rol: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class BlockUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}