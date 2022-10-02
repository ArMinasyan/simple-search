import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FriendsEntity } from './entities/friends.entity';

@Injectable()
export class FriendsRepository extends Repository<FriendsEntity> {
  constructor(private dataSource: DataSource) {
    super(FriendsEntity, dataSource.createEntityManager());
  }

  requestStatus(accept: boolean, requestId: number) {
    return this.update(requestId, {
      status: accept ? 2 : 3,
    });
  }

  sendRequest(senderId: number, receiverId: number) {
    return this.save({
      requested_from: senderId,
      requested_to: receiverId,
    });
  }
}
