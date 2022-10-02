import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../auth/entities/users.entity';

@Injectable()
export class ProfileRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  search(userInfo) {
    const builder = this.createQueryBuilder('u').select(
      `u.first_name, u.last_name, u.email, u.age`,
    );

    if (userInfo?.first_name) {
      builder.where(
        `LOWER(first_name) = :first_name AND
      LOWER(last_name) = :last_name AND
      age = :age`,
        userInfo,
      );
    }

    return builder.getRawMany();
  }
}
