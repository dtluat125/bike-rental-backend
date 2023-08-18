import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateDockDto {
  @ApiProperty({ example: 'Dock A' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  location: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsOptional()
  dockArea: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsOptional()
  totalPoints: number;

  @ApiProperty({ example: 'dock.jpg' })
  @IsOptional()
  walkingDistance: number;

  @ApiProperty()
  @IsOptional()
  bikes: number[];
}
