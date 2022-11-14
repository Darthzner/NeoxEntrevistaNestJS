import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class EmailRecovery {
  @IsEmail()
  @IsNotEmpty()
  email: string;  
}
