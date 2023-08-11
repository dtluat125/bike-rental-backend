import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateBikeDto {
  @ApiProperty({ example: 'Type1' })
  @IsNotEmpty()
  @IsOptional()
  type: string;

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
}