import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindProfileDto {
  @ApiProperty({ required: false, example: 'John Doe 20' })
  @IsString()
  @IsOptional()
  filter: string;
}
