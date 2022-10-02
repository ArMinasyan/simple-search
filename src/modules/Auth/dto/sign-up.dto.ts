import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsString, Min } from 'class-validator';
import validationMessages from '../../../common/helpers/validation.messages';

export class SignUpDto {
  @ApiProperty()
  @IsString({ message: validationMessages.required })
  firstName: string;

  @ApiProperty()
  @IsString({ message: validationMessages.required })
  lastName: string;

  @ApiProperty()
  @IsNumberString({ message: validationMessages.number })
  @Min(18, { message: validationMessages.min })
  age: number;

  @ApiProperty()
  @IsEmail({}, { message: validationMessages.email })
  email: string;

  @ApiProperty()
  @IsString({ message: validationMessages.required })
  password: string;

  @ApiProperty({
    type: 'file',
    name: 'image',
  })
  image: any;
}
