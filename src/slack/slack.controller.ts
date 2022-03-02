import { Body, Controller, Post } from '@nestjs/common';
import { SlackCommandDto } from './dto/slack-command';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { ResponseContent } from './response-contents/response-content';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(private slackService: SlackService) {}

  @Post('send-sol')
  async sendSol(@Body() body: SlackCommandDto): Promise<ResponseContent> {
    const fromUsername = body.user_name;
    if (!fromUsername) {
      return new ErrorResponseContent('SOL sender is required.');
    }

    const contents = body.text.split(' ');
    if (contents.length !== 2) {
      return new ErrorResponseContent(
        'Invalid format. Please use `@user <sol-amount>`',
      );
    }

    const [user, sol] = contents;
    if (user.charAt(0) !== '@') {
      return new ErrorResponseContent(
        'Invalid receiver format. Please make sure `@` in front of the username.',
      );
    }
    const toUsername = user.substring(1);

    const solNumber = Number(sol);
    if (isNaN(solNumber)) {
      return new ErrorResponseContent(
        'Invalid SOL amount. It should be a number.',
      );
    }

    return await this.slackService.sendSol(fromUsername, toUsername, solNumber);
  }
}
