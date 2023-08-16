import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReturnBikeDto {
  @ApiProperty()
  @IsNotEmpty()
  dockId: number;
}
