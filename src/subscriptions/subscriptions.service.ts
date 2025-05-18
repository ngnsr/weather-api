import { Injectable } from '@nestjs/common';
import { EmailService } from 'shared/utils';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly emailService: EmailService) {}

  public subscribe() {
    this.emailService.testMail();
  }
}
