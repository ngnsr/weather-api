import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService } from '@nestjs/config';
import {
  SubscriptionConfirmationContext,
  WeatherNotificationContext,
} from './email.types';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public subscriptionConfirmation(
    to: string,
    context: SubscriptionConfirmationContext,
  ): void {
    const emailBody = `
    <p>Hello, ${context.email}</p>

    <p>Thank you for subscribing to <strong>${context.city} ${context.frequency}</strong> weather updates!</p>

    <p>Please confirm your subscription by clicking the link below:<br/>
    <a href="${context.confirmationLink}">${context.confirmationLink}</a></p>

    <p>If you did not request this subscription, please ignore this email.</p>

    <p>Best regards,<br/>
    WeatherAPITestCase</p>
  `;

    this.sendMail({
      to,
      from: this.configService.get<string>('EMAIL_USER'),
      subject: 'WeatherAPITestCase - Subscription Confirmation',
      html: emailBody,
    });
  }

  public sendWeatherNotification(
    to: string,
    context: WeatherNotificationContext,
  ): void {
    const { city, frequency, weather, unsubscribeLink, email } = context;

    const emailBody = `
    <p>Hello, ${email}</p>

    <p>Here's your <strong>${frequency}</strong> weather update for <strong>${city}</strong>:</p>

    <ul>
      <li>🌡 Temperature: ${weather.temperature}°C</li>
      <li>☁️ Description: ${weather.description}</li>
      <li>💧 Humidity: ${weather.humidity}%</li>
    </ul>

    <p>Best regards,<br/>
    WeatherAPITestCase</p>

    <p><a href="${unsubscribeLink}" style="color:rgb(255, 166, 0);">Unsubscribe</a> from these notifications</p>
  `;

    this.sendMail({
      to,
      from: this.configService.get<string>('EMAIL_USER'),
      subject: `🌦 Weather Update for ${city}`,
      html: emailBody, // Use HTML here
    });
  }

  private sendMail(options: ISendMailOptions): void {
    this.mailerService.sendMail(options).catch((error) => {
      console.error('Send mail error: ', error);
    });
  }
}
