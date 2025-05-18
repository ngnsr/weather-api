import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionFrequency } from '../enums';

export class SubscriptionResponseDto {
  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'City for weather updates' })
  city: string;

  @ApiProperty({
    description: 'Frequency of updates',
    enum: SubscriptionFrequency,
  })
  frequency: SubscriptionFrequency;

  @ApiProperty({ description: 'Whether the subscription is confirmed' })
  confirmed: boolean;
}
