import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty({ example: 0, description: 'Temperature in degrees Celsius' })
  temperature: number;

  @ApiProperty({ example: 0, description: 'Humidity in percentage' })
  humidity: number;

  @ApiProperty({
    description: 'Short description of the weather',
  })
  description: string;
}
