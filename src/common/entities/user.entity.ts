import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.user, {
    cascade: true,
  })
  subscriptions: SubscriptionEntity[];
}
