import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { BikeType } from 'src/bike/constants';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateBikeDto {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Bike'], {
    message: 'barcodeAlreadyExist',
  })
  barcode: string;

  @ApiProperty({ enum: BikeType })
  @IsNotEmpty()
  @IsEnum(BikeType)
  type: BikeType;

  @ApiProperty({ example: 'bike.jpg' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 'ABC123' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ABC123' })
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 80 })
  @IsNumber()
  battery: number;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsNumber()
  rentingPrice: number;

  @ApiProperty()
  @IsOptional()
  dock: number;
}
