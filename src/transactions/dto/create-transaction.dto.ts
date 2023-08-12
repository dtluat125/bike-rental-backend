import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  rentedBikeId: number;

  @ApiProperty()
  @IsNotEmpty()
  rentalPrice: number;
}
