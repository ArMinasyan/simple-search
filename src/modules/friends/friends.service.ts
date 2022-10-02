import { Injectable } from '@nestjs/common';
import { RequestStatusDto } from './dto/request-status.dto';
import { FriendsRepository } from './friends.repository';
import { IResponse } from '../../common/helpers/IResponse';
import responseMessage from '../../common/helpers/response-message';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  async getRequestList(userId: number): Promise<IResponse> {
    const requestList = await this.friendsRepository.find({
      where: {
        requested_to: userId,
      },
    });

    return responseMessage({
      data: requestList,
    });
  }
  async requestStatus(payload: RequestStatusDto): Promise<IResponse> {
    const updatedStatus = await this.friendsRepository.requestStatus(
      payload.accept,
      payload.requestId,
    );
    return responseMessage({
      data: updatedStatus,
    });
  }

  async sendRequest(senderId: number, receiverId: number): Promise<IResponse> {
    const request = await this.friendsRepository.sendRequest(
      senderId,
      receiverId,
    );
    return responseMessage({
      data: request,
    });
  }
}
