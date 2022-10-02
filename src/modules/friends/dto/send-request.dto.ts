import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class SendRequestDto {
  @ApiProperty()
  @IsNumberString()
  receiverId: number;
}
