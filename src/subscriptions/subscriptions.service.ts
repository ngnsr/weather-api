import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'shared/utils';
import { SubscribeDto } from 'src/common/dto/subscribe.dto';
import { TokenDto } from 'src/common/dto/token.dto';
import { SubscriptionEntity } from 'src/common/entities/subscription.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly repository: Repository<SubscriptionEntity>,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  get() {
    return this.repository;
  }

  async subscribe(subscribeDto: SubscribeDto) {
    console.log(subscribeDto);
    const { email, city, frequency } = subscribeDto;
    const user = await this.usersService.findOrSave(email);
    if (!user) {
      throw new BadRequestException('Invalid input');
    }
    const existingSubscription = user.subscriptions?.find(
      (sub) => sub.city.toLowerCase() === city.toLowerCase(),
    );
    if (existingSubscription) {
      // can be not confirmed
      throw new ConflictException('Email already subscribed');
    }

    const subscription = await this.repository.save({
      ...subscribeDto,
      user: { id: user.id },
    });

    this.emailService.subscriptionConfirmation(email, {
      email,
      city,
      frequency,
      confirmationLink: `http://localhost:3001/api/confirm/${subscription.confirmationToken}`, // TODO: fix
    });
    return { message: 'Subscription successful. Confirmation email sent.' };
  }

  async confirmSubscription({ token }: TokenDto) {
    const subscription = await this.repository.findOne({
      where: { confirmationToken: token },
    });

    if (!subscription) throw new NotFoundException('Token not found');
    if (subscription.isActive) throw new BadRequestException('Invalid token');

    subscription.isActive = true;
    await this.repository.save(subscription);
    return { message: 'Subscription confirmed successfully' };
  }

  async unsubscribe({ token }: TokenDto) {
    const subscription = await this.repository.findOne({
      where: { unsubscribeToken: token },
    });
    if (!subscription) throw new NotFoundException('Token not found');
    await this.repository.remove(subscription);
    return { message: 'Unsubscribed successfully' };
  }
}
