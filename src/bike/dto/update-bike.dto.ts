import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BikeStatus, BikeType } from 'src/bike/constants';

export class UpdateBikeDto {
  @ApiProperty({ enum: BikeType })
  @IsOptional()
  @IsEnum(BikeType)
  type: BikeType;

  @ApiProperty({ enum: BikeStatus })
  @IsOptional()
  @IsEnum(BikeStatus)
  status: BikeStatus;

  @ApiProperty({ example: 'bike.jpg' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 'ABC123' })
  @IsNotEmpty()
  @IsOptional()
  licensePlate: string;

  @ApiProperty({ example: 80 })
  @IsNumber()
  @IsOptional()
  battery: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  rentingPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  dock: number;
}
