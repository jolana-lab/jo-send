import { Body, Controller, Post } from '@nestjs/common';
import { SendSolDto } from './dto/send-sol.dto';

@Controller('slack')
export class SlackController {
  @Post('send-sol')
  async sendSol(@Body() body: SendSolDto) {
    console.log(body);
  }
}
