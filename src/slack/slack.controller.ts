import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { WalletService } from '../wallet/wallet.service';
import { SlackCommandDto } from './dto/slack-command.dto';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
import { ResponseContent } from './response-contents/response-content';
import { SlackService } from './slack.service';

@ApiTags('slack')
@Controller('slack')
export class SlackController {
  constructor(
    @InjectQueue('slack') private readonly slackQueue: Queue,
    private readonly walletService: WalletService,
    private readonly slackService: SlackService,
  ) {}

  @ApiBody({
    type: SlackCommandDto,
    examples: {
      sendSol: {
        summary: 'Send 0.1 SOL from @jo-send-local to @jo-receive-local',
        value: {
          user_name: 'jo-send-local',
          text: '@jo-receive-local 0.1',
        },
      },
    },
  })
  @Post('send-sol')
  async sendSol(@Body() body: SlackCommandDto): Promise<ResponseContent> {
    try {
      const { fromUsername, toUsername, sol } = this.slackService.sendSol(body);
      await this.slackQueue.add('send-sol', {
        fromUsername,
        toUsername,
        sol,
      });
      return new OkResponseContent(
        `${fromUsername} sent ${sol} SOL to ${toUsername}`,
      );
    } catch (e) {
      return new ErrorResponseContent(e.message);
    }
  }

  @ApiBody({
    type: SlackCommandDto,
    examples: {
      airdropSol: {
        summary: 'airdrop 1 SOL to @jo-send-local',
        value: {
          user_name: 'jo-send-local',
          text: '1',
        },
      },
    },
  })
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

  @ApiBody({
    type: SlackCommandDto,
    examples: {
      checkBalance: {
        summary: 'check the balance of @jo-send-local',
        value: {
          user_name: 'jo-send-local',
        },
      },
    },
  })
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
