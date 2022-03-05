import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { WalletService } from '../wallet/wallet.service';
import { SlackCommandDto } from './dto/slack-command';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
import { ResponseContent } from './response-contents/response-content';

@Controller('slack')
export class SlackController {
  constructor(
    @InjectQueue('slack') private readonly slackQueue: Queue,
    private readonly walletService: WalletService,
  ) {}

  @Post('send-sol')
  async sendSol(@Body() body: SlackCommandDto): Promise<ResponseContent> {
    const fromUsername = body.user_name;
    if (!fromUsername) {
      return new ErrorResponseContent('SOL sender is required.');
    }

    const contents = body.text.trim().split(' ');
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

    await this.slackQueue.add('send-sol', {
      fromUsername,
      toUsername,
      sol: solNumber,
    });
    return new OkResponseContent(
      `${fromUsername} sent ${sol} SOL to ${toUsername}`,
    );
  }

  @Post('airdrop-sol')
  async airdropSol(@Body() body: SlackCommandDto): Promise<ResponseContent> {
    const username = body.user_name;
    if (!username) {
      return new ErrorResponseContent('SOL sender is required.');
    }

    const contents = body.text.trim().split(' ');
    if (contents.length !== 1) {
      return new ErrorResponseContent(
        'Invalid format. Please use `<sol-amount>`',
      );
    }

    const [sol] = contents;
    const solNumber = Number(sol);
    if (isNaN(solNumber)) {
      return new ErrorResponseContent(
        'Invalid SOL amount. It should be a number.',
      );
    }

    await this.slackQueue.add('airdrop-sol', {
      username,
      sol: solNumber,
    });
    return new OkResponseContent(
      `${username} airdropped ${sol} SOL to the wallet.`,
    );
  }

  @Post('check-balance')
  async checkBalance(@Body() body: SlackCommandDto): Promise<ResponseContent> {
    const username = body.user_name;
    if (!username) {
      return new ErrorResponseContent('Username is required.');
    }
    try {
      const balance = await this.walletService.getBalance(username);
      return new OkResponseContent(`${username} has ${balance.balance}.`);
    } catch (e) {
      return new ErrorResponseContent(
        `${username} doesn't have a wallet.
        Please airdrop SOL or ask your friends to send you SOL.
        Your wallet is automatically created once you receive SOL.`,
      );
    }
  }
}
