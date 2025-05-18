import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SubscriptionFrequency } from 'src/common/enums';
import { Expose } from 'class-transformer';

@Unique(['user', 'city'])
@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  user: UserEntity;

  @Column({ type: 'enum', enum: SubscriptionFrequency })
  frequency: SubscriptionFrequency;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Expose()
  @Column()
  @Generated('uuid')
  confirmationToken: string;

  @Expose()
  @Column()
  @Generated('uuid')
  unsubscribeToken: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
