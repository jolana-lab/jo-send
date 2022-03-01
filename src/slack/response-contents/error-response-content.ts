import { ResponseContent } from './response-content';

export class ErrorResponseContent extends ResponseContent {
  public readonly response_type: string = 'ephemeral';
  public readonly text: string = ':x: ';

  constructor(text: string) {
    super();
    this.text += text;
  }
}
