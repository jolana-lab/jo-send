import { Injectable } from '@nestjs/common';
import { SlackCommandDto } from './dto/slack-command.dto';

@Injectable()
export class SlackService {
  sendSol(body: SlackCommandDto): {
    fromUsername: string;
    toUsername: string;
    sol: number;
  } {
    const fromUsername = body.user_name;
    if (!fromUsername) {
      throw new Error('SOL sender is required.');
    }

    const contents = body.text.trim().split(' ');
    if (contents.length !== 2) {
      throw new Error('Invalid format. Please use `@user <sol-amount>`');
    }

    const [user, sol] = contents;
    if (user.charAt(0) !== '@') {
      throw new Error(
        'Invalid receiver format. Please make sure `@` in front of the username.',
      );
    }
    const toUsername = user.substring(1);

    const solNumber = Number(sol);
    if (isNaN(solNumber)) {
      throw new Error('Invalid SOL amount. It should be a number.');
    }

    return {
      fromUsername,
      toUsername,
      sol: solNumber,
    };
  }

  airdropSol(body: SlackCommandDto): {
    username: string;
    sol: number;
  } {
    const username = body.user_name;
    if (!username) {
      throw new Error('SOL sender is required.');
    }

    const contents = body.text.trim().split(' ');
    if (contents.length !== 1) {
      throw new Error('Invalid format. Please use `<sol-amount>`');
    }

    const [sol] = contents;
    const solNumber = Number(sol);
    if (isNaN(solNumber)) {
      throw new Error('Invalid SOL amount. It should be a number.');
    }

    return {
      username,
      sol: solNumber,
    };
  }
}
