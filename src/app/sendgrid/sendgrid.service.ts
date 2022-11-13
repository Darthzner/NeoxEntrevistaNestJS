import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import * as SendGrid from '@sendgrid/mail';
import * as bcrypt from 'bcrypt'
import { EmailRecovery } from './dtos/sendgrid.dto';

@Injectable()
export class SendgridService  {
  constructor(private readonly configService: ConfigService, private prisma: PrismaService) {
    // Don't forget this one.
    // The apiKey is required to authenticate our
    // request to SendGrid API.    
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async send(email: EmailRecovery) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          user_id: email.email,
        },
      })
      if (user){
        const code = await bcrypt.hash(`${user.user_name}${user.user_password}`, 10)
        await this.prisma.users.update({
          data: {
            secret_code: code,
          },
          where: {
            user_id: email.email,
          },
        });
        const mail = {
          to: email.email,
          subject: 'Hello from sendgrid',
          from: 'carrascolester17@gmail.com', // Fill it with your validated email on SendGrid account
          text: `Hello`,
          html: `<h1>Hello</h1><br><br> Your recoveery code is: ${code}`,
        };
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
        console.log(`E-Mail sent to ${mail.to}`);
        console.log(`Your Recovery code is ${code}`)
        return transport;
      }
      else {
        return "Email no encontrado en el sistema"
      }
      
  
    } catch (error) {
      console.log(error)
    }
  }
}