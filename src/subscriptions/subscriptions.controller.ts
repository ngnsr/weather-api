import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribeDto } from 'src/common/dto/subscribe.dto';
import { TokenDto } from 'src/common/dto/token.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SubscriptionResponseDto } from 'src/common/dto/subscripion-response.dto';

@Controller()
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Post('subscribe')
  @ApiOperation({
    summary: 'Subscribe to weather updates',
    description:
      'Subscribe an email to receive weather updates for a specific city with chosen frequency.',
  })
  @ApiOkResponse({
    description: 'Subscription successful. Confirmation email sent.',
    type: SubscriptionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Email already subscribed' })
  async subscribe(@Body() dto: SubscribeDto) {
    return await this.subscriptionService.subscribe(dto);
  }

  @Get('confirm/:token')
  @ApiOperation({
    summary: 'Confirm email subscription',
    description:
      'Confirms a subscription using the token sent in the confirmation email.',
  })
  @ApiParam({
    name: 'token',
    description: 'UUID token used to confirm the subscription',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription confirmed successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Token not found' })
  async confirm(@Param() tokenDto: TokenDto) {
    return await this.subscriptionService.confirmSubscription(tokenDto);
  }

  @Get('unsubscribe/:token')
  @ApiOperation({
    summary: 'Unsubscribe from weather updates',
    description:
      'Unsubscribes an email from weather updates using the token sent in emails.',
  })
  @ApiParam({
    name: 'token',
    description: 'Unsubscribe token',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Unsubscribed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Token not found' })
  async unsubscribe(@Param() tokenDto: TokenDto) {
    return await this.subscriptionService.unsubscribe(tokenDto);
  }
}
