import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [
    WeatherService,
    {
      provide: 'WEATHER_API_CONFIG',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const baseUrl = config.get<string>('WEATHER_API_URL');
        const apiKey = config.get<string>('WEATHER_API_KEY');

        if (!baseUrl || !apiKey) {
          throw new Error('Missing WEATHER_API_URL or WEATHER_API_KEY in .env');
        }

        return { baseUrl, apiKey };
      },
    },
  ],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
