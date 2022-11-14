import { Controller, Post, Body } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { EmailRecovery } from './dtos/sendgrid.dto';

@Controller('/api/recovery')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}

  // Here we use query parameter to get the email that we want to send
  @Post('/password')
  async sendEmail(@Body() email: EmailRecovery) {   

    return await this.sendgridService.send(email);
  }
}