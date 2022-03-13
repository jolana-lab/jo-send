import { ApiProperty } from '@nestjs/swagger';

export class SlackCommandDto {
  @ApiProperty()
  readonly user_name: string;

  @ApiProperty({ required: false })
  readonly text: string;
}
