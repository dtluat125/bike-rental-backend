import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { RentalsService } from 'src/rentals/rentals.service';
import { ReturnBikeDto } from 'src/rentals/dto/return-bike.dto';

@Controller({ path: 'rentals', version: '1' })
export class RentalsController {
  constructor(private readonly rentalService: RentalsService) {}

  @Post()
  async createRental(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.createRental(createRentalDto);
  }

  @Put(':id/finish-rental')
  async returnRental(
    @Param('id') id: number,
    @Body() returnBikeDto: ReturnBikeDto,
  ) {
    return this.rentalService.returnRental(id, returnBikeDto);
  }

  @Get('')
  async getAllRental() {
    return this.rentalService.getAllRentals();
  }

  @Get(':id')
  async getRental(@Param('id') id: number) {
    return this.rentalService.getRental(id);
  }

  @Put(':id')
  async updateRental(
    @Param('id') id: number,
    @Body() updateRentalDto: UpdateRentalDto,
  ) {
    return this.rentalService.updateRental(id, updateRentalDto);
  }

  @Delete(':id')
  async deleteRental(@Param('id') id: number) {
    return this.rentalService.deleteRental(id);
  }

  // @Get('return-bike/:id')
  // async returnBike(@Param('id') id: number) {
  //   return this.rentalService.returnBike(id);
  // }
}
