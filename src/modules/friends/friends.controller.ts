import { Body, Controller, Get, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { RequestStatusDto } from './dto/request-status.dto';
import { IResponse } from '../../common/helpers/IResponse';
import { SendRequestDto } from './dto/send-request.dto';
import { User } from '../../common/customDecorators/user.decorator';

@ApiBearerAuth()
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({
    tags: ['friends'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Get('request-list')
  requestList(@User() user): Promise<IResponse> {
    return this.friendsService.getRequestList(user.id);
  }

  @ApiOperation({
    tags: ['friends'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('request-status')
  requestStatus(@Body() payload: RequestStatusDto): Promise<IResponse> {
    return this.friendsService.requestStatus(payload);
  }

  @ApiOperation({
    tags: ['friends'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('send-request')
  sendFriendRequest(
    @Body() payload: SendRequestDto,
    @User() user,
  ): Promise<IResponse> {
    return this.friendsService.sendRequest(user.id, payload.receiverId);
  }
}
