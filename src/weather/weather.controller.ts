import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CityParamDto } from 'src/common/dto/city-param.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { WeatherResponseDto } from 'src/common/dto/weather-response.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get current weather for a city' })
  @ApiOkResponse({
    description: 'Successful operation - current weather forecast returned',
    type: WeatherResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiNotFoundResponse({ description: 'City not found' })
  async get(@Query() city: CityParamDto) {
    return this.weatherService.getCurrentWeather(city);
  }
}
