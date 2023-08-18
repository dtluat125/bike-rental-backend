import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty()
  @IsNotEmpty()
  user: number;

  @ApiProperty()
  @IsNotEmpty()
  bike: number;

  @ApiProperty()
  @IsNotEmpty()
  pricing: number;
}
