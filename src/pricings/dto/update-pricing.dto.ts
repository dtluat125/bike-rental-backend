// src/pricing/dto/update-pricing.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePricingDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  basePrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  additionalPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  timeThreshold?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  freeThreshold?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lateFee?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  refundRate?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  refundThreshold?: number;
}
