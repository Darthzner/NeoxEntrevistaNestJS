import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  user: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  user: string;
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

export class Recovery {
  @IsEmail()
  @IsNotEmpty()
  user: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}

