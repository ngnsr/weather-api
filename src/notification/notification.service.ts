import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from '../weather/weather.service';
import { SubscriptionFrequency } from 'src/common/enums';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { EmailService } from 'shared/utils';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly subscriptionService: SubscriptionsService,
    private readonly weatherService: WeatherService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySubscriptions() {
    await this.process(SubscriptionFrequency.hourly);
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleDailySubscriptions() {
    await this.process(SubscriptionFrequency.daily);
  }

  private async process(frequency: SubscriptionFrequency) {
    const subs = await this.subscriptionService.get().find({
      where: { isActive: true, frequency },
      relations: ['user'],
    });

    const uniqueCities = [...new Set(subs.map((sub) => sub.city))];
    const weatherMap = new Map<
      string,
      { temperature: number; description: string; humidity: number }
    >();

    for (const city of uniqueCities) {
      const weather = await this.weatherService.getCurrentWeather({ city });
      if (!weather) {
        console.warn(`No weather data for city: ${city}`);
        continue;
      }
      weatherMap.set(city, weather);
    }

    for (const sub of subs) {
      const weather = weatherMap.get(sub.city);
      if (!weather) continue;

      this.emailService.sendWeatherNotification(sub.user.email, {
        email: sub.user.email,
        city: sub.city,
        frequency: sub.frequency,
        weather: {
          temperature: weather.temperature,
          description: weather.description,
          humidity: weather.humidity,
        },
        unsubscribeLink: `http://localhost:3001/api/unsubscribe/${sub.unsubscribeToken}`, // TODO: fix
      });
    }
  }
}
