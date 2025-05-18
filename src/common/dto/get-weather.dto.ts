import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CityParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'City name must be provided' })
  @Type(() => String)
  city: string;
}
