import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateRentalDto {
  @ApiProperty()
  @IsOptional()
  user: number;

  @ApiProperty()
  @IsOptional()
  bike: number;

  @ApiProperty()
  @IsOptional()
  pricing: number;
}
