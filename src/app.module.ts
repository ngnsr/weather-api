import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { WeatherModule } from './weather/weather.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from '../shared/postgres/postgres.module';
import * as Joi from 'joi';
import { entities } from './common/entities';
import { migrations } from './common/migrations';
import { ShedulerService } from './sheduler/sheduler.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().optional().default('Weather API'),
        API_DOCS_ENABLED: Joi.string()
          .optional()
          .default('false')
          .allow('true', 'false'),
        PORT: Joi.number().required(),

        // DB
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_ADMIN_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_IS_LOGGING_ENABLED: Joi.string()
          .optional()
          .default('false')
          .allow('true', 'false'),

        // Email
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASS: Joi.string().required(),
      }),
    }),
    PostgresModule.register(entities, migrations),
    UsersModule,
    EmailModule,
    WeatherModule,
    SchedulerModule,
    SubscriptionsModule,
  ],
  controllers: [],
  providers: [ShedulerService],
})
export class AppModule {}
