import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SendSolDto } from './dto/send-sol.dto';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(private slackService: SlackService) {}

  @Post('send-sol')
  async sendSol(@Body() body: SendSolDto) {
    const fromUsername = body.user_name;
    if (!fromUsername) {
      throw new BadRequestException('SOL sender is required.');
    }

    const contents = body.text.split(' ');
    if (contents.length !== 2) {
      throw new BadRequestException(
        'Invalid format. Please use `@user <sol-amount>`',
      );
    }

    const [user, sol] = contents;
    if (user.charAt(0) !== '@') {
      throw new BadRequestException(
        'Invalid receiver format. Please make sure `@` in front of the username.',
      );
    }
    const toUsername = user.substring(1);

    const solNumber = Number(sol);
    if (isNaN(solNumber)) {
      throw new BadRequestException(
        'Invalid SOL amount. It should be a number.',
      );
    }

    return await this.slackService.sendSol(fromUsername, toUsername, solNumber);
  }
}
