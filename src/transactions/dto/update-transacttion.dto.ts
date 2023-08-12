import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  rentedBikeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  rentalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  returnDate: Date;
}
