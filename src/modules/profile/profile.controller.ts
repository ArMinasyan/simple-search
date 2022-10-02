import { Controller, Get, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FindProfileDto } from './dto/find-profile.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    tags: ['profile'],
  })
  @Get('search')
  searchProfile(@Query() query: FindProfileDto) {
    const userInfo: {
      first_name?: string;
      last_name?: string;
      age?: number;
    } = {};

    if (query.filter) {
      const [firstName, lastName, age] = query.filter.split(' ');
      userInfo.first_name = firstName.toLowerCase();
      userInfo.last_name = lastName.toLowerCase();
      userInfo.age = parseInt(age);
    }

    return this.profileService.search(userInfo);
  }
}
