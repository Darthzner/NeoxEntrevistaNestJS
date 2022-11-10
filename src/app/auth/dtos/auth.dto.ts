import { IsString, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsString()
  user: string;
  @IsNotEmpty() 
  password: string;
}