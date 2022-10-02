import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindProfileDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  filter: string;
}
