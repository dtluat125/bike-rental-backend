import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDockDto {
  @ApiProperty({ example: 'Dock A' })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({ example: '123 Main St' })
  @IsNotEmpty()
  @IsOptional()
  location: string;

  @ApiProperty({ example: 'dock.jpg' })
  @IsNotEmpty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  bikes: number[];
}
