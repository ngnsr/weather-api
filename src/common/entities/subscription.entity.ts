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

@Unique(['user', 'city'])
@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (entity) => entity.id, { nullable: false })
  user: UserEntity;

  @Column({ type: 'enum', enum: SubscriptionFrequency })
  frequency: SubscriptionFrequency;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'boolean', default: false })
  isConfirmed: boolean;

  @Column({ type: 'date', nullable: true })
  confirmationTokenExpiresAt: Date;

  @Column({ type: 'boolean', default: false })
  isUnsubscribed: boolean;

  @Column({ type: 'boolean', default: false, generated: true }) // isConfirmed && !isUnsubscribed
  isActive: boolean;

  @Column()
  @Generated('uuid')
  confirmationToken: string;

  @Column()
  @Generated('uuid')
  unsubscribeToken: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
