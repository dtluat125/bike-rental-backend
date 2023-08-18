import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Bike } from '../../bike/entities/bike.entity';

export class CreateDockDto {
  @ApiProperty({ example: 'Dock A' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main St' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsNotEmpty()
  dockArea: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsNotEmpty()
  totalPoints: number;

  @ApiProperty({ example: 'dock.jpg' })
  @IsNotEmpty()
  walkingDistance: number;

  @ApiProperty()
  @IsOptional()
  bikes: Bike[];
}
