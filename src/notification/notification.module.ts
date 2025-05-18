import { Module } from '@nestjs/common';
import { EmailModule } from 'shared/utils';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { NotificationsService } from './notification.service';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [SubscriptionsModule, WeatherModule, EmailModule],
  controllers: [],
  providers: [NotificationsService],
})
export class NotificationModule {}
