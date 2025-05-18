import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService } from '@nestjs/config';
import { SubscriptionConfirmationContext } from './email.types';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    // private readonly logger: Bunyan,
  ) {}

  public subscripionConfirmation(
    to: string,
    context: SubscriptionConfirmationContext,
  ): void {
    this.sendMail({
      to,
      from: this.configService.get<string>('EMAIL_USER'),
      subject: 'MGear - Login Confirmation',
      template: 'login-confirmation',
      context,
    });
  }

  public testMail() {
    this.sendMail({
      to: 'examplemail8374@gmail.com',
      from: this.configService.get<string>('EMAIL_USER'),
      subject: 'Test mail',
      text: 'test text',
    });
  }

  private sendMail(options: ISendMailOptions): void {
    this.mailerService.sendMail(options).catch((error) => {
      console.error(error);
      //   this.logger.error({ data: { options, error } }, 'Send mail error');
    });
  }
}
