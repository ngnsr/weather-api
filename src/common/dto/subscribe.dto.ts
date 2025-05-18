import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionFrequency } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @ApiProperty({ enum: SubscriptionFrequency })
  @IsEnum(SubscriptionFrequency)
  frequency: SubscriptionFrequency;
}
