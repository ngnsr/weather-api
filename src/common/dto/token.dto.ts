import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Token must be provided' })
  @Type(() => String)
  @IsUUID(4, { message: 'Invalid token' })
  token: string;
}
