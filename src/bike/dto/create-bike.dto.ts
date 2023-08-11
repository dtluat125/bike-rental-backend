import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateBikeDto {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Bike'], {
    message: 'barcodeAlreadyExist',
  })
  barcode: string | null;

  @ApiProperty({ enum: ['Type1', 'Type2', 'Type3'] })
  @IsNotEmpty()
  type: string | null;

  @ApiProperty({ example: 'bike.jpg' })
  image: string;

  @ApiProperty({ example: 'ABC123' })
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 80 })
  @IsNumber()
  battery: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  rentingPrice: number;
}
