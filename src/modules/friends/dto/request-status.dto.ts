import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class RequestStatusDto {
  @ApiProperty({
    default: true,
  })
  @IsString()
  accept: boolean;

  @ApiProperty()
  @IsNumberString()
  requestId: number;
}
