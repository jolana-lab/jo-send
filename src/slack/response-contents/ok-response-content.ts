import { ResponseContent } from './response-content';

export class OkResponseContent extends ResponseContent {
  public readonly response_type: string = 'in_channel';
  public readonly text: string = ':white_check_mark: ';

  constructor(text: string) {
    super();
    this.text += text;
  }
}
