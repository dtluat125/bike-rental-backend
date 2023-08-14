import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikeService } from 'src/bike/bike.service';
import { BikeStatus } from 'src/bike/constants';
import { Rental } from 'src/rentals/entities/rental.entity';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PricingsService } from 'src/pricings/pricings.service';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    private readonly bikeService: BikeService,
    private readonly pricingService: PricingsService,
  ) {}

  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const bike = await this.bikeService.getBikeDetail(createRentalDto.bike);
    console.log(createRentalDto);
    if (bike.status !== BikeStatus.FREE)
      throw new BadRequestException('Bike is in used');

    const rental = this.rentalRepository.create(
      createRentalDto as unknown as Rental,
    );

    await this.bikeService.update(createRentalDto.bike, {
      status: BikeStatus.IN_USE,
    } as any);
    return this.rentalRepository.save(rental);
  }

  async getAllRentals(): Promise<Rental[]> {
    return this.rentalRepository.find();
  }

  async getRental(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ['bike'],
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }

    const currentTime = new Date();
    const rentalDateLocal = new Date(
      rental.rentalDate.getTime() -
        rental.rentalDate.getTimezoneOffset() * 60 * 1000,
    );

    const rentingTimeDifference = Math.floor(
      (currentTime.getTime() - rentalDateLocal.getTime()) / (1000 * 60),
    );
    console.log(currentTime.getTime(), rentalDateLocal.getTime());
    const currentPrice = await this.pricingService.calculateRentingPrice(
      rentingTimeDifference,
      rental.bike.type,
    );
    return {
      ...rental,
      rentingTime: rentingTimeDifference,
      currentPrice: currentPrice,
    } as any;
  }

  async updateRental(
    id: number,
    updateRentalDto: UpdateRentalDto,
  ): Promise<Rental> {
    const rental = await this.getRental(id);
    Object.assign(rental, updateRentalDto);
    return this.rentalRepository.save(rental);
  }

  async deleteRental(id: number): Promise<void> {
    const rental = await this.getRental(id);
    await this.rentalRepository.remove(rental);
  }

  async returnRental(id: number) {
    const updatedRental = {
      returnDate: new Date(),
    };
    const response = await this.updateRental(id, updatedRental as any);
    await this.bikeService.update(response.bike.id, {
      status: BikeStatus.FREE,
    } as any);
    return response;
  }

  // async returnBike(id: number): Promise<>;
}
