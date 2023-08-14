import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePricingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  additionalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  freeThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  timeThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lateFee: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  refundRate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  refundThreshold: number;
}
