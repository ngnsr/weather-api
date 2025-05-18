import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CityParamDto } from 'src/common/dto/city-param.dto';
import { AxiosError } from 'axios';
import { WeatherApiResponse } from 'src/common/types/weather-api-repsonse';
import { WeatherApiConfig } from 'src/common/types/weather-api-config';
import { WeatherApiError } from 'src/common/types/weather-api-error';

@Injectable()
export class WeatherService {
  constructor(
    @Inject('WEATHER_API_CONFIG') private readonly config: WeatherApiConfig,
    private readonly httpService: HttpService,
  ) {}

  async getCurrentWeather({ city }: CityParamDto) {
    const url = `${this.config.baseUrl}/current.json?key=${this.config.apiKey}&q=${encodeURIComponent(city)}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<WeatherApiResponse>(url),
      );
      const data = response.data;
      return {
        city: data.location.name,
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        humidity: data.current.humidity,
      };
    } catch (error) {
      const err = error as AxiosError<WeatherApiError>;
      const statusCode =
        err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const apiMessage = err.response?.data?.error?.message;

      if (
        statusCode === 400 &&
        apiMessage?.toLowerCase().includes('no matching location found')
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: `City not found`,
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      console.error('WeatherService Error:', err.message, err.response?.data);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Failed to fetch weather data: ${apiMessage ?? err.message}`,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
