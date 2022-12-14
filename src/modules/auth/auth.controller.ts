import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    tags: ['auth'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('sign-in')
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @ApiOperation({
    tags: ['auth'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('sign-up')
  signUp(@Body() payload: SignUpDto) {
    return this.authService.signUp(payload);
  }
}
