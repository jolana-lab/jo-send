import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackService {
  async sendSol(
    fromUsername: string,
    toUsername: string,
    sol: number,
  ): Promise<any> {
    return Promise.resolve();
  }
}
