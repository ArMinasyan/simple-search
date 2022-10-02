import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsString,
  Min,
} from 'class-validator';
import validationMessages from '../../../common/helpers/validation.messages';
import { Type } from 'class-transformer';

export class SignUpDto {
  @ApiProperty()
  @IsString({ message: validationMessages.required })
  firstName: string;

  @ApiProperty()
  @IsString({ message: validationMessages.required })
  lastName: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.number })
  @Min(18, { message: validationMessages.min })
  @Type(() => Number)
  age: number;

  @ApiProperty()
  @IsEmail({}, { message: validationMessages.email })
  email: string;

  @ApiProperty()
  @IsString({ message: validationMessages.required })
  password: string;
}
