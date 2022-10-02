import { BaseEntity } from '../../../common/helpers/baseEntity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../auth/entities/users.entity';
import { requestStatus } from '../../../common/helpers/request-status.enum';

@Entity({
  name: 'friends',
})
export class FriendsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({
    name: 'requested_to',
  })
  requested_to: number;

  @OneToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({
    name: 'requested_from',
  })
  requested_from: number;

  @Column({
    type: 'enum',
    enum: requestStatus,
    default: requestStatus.PENDING,
  })
  status: requestStatus;
}
