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
import { DocksService } from 'src/docks/docks.service';
import { ReturnBikeDto } from 'src/rentals/dto/return-bike.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    private readonly bikeService: BikeService,
    private readonly docksService: DocksService,
    private readonly pricingService: PricingsService,
  ) {}

  async createRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const bike = await this.bikeService.getBikeDetail(createRentalDto.bike);
    console.log(createRentalDto);
    if (bike.status !== BikeStatus.FREE)
      throw new BadRequestException('Bike is in used');
    const dock = await this.docksService.getDockContainsBike(
      createRentalDto.bike,
    );
    console.log('dock: ', dock);
    if (!dock) throw new BadRequestException('Bike not available in any docks');
    const pricing = await this.pricingService.findOne(createRentalDto.pricing);
    if (!pricing.active) throw new BadRequestException('Pricing not active');
    const rental = this.rentalRepository.create(
      createRentalDto as unknown as Rental,
    );

    await this.bikeService.update(createRentalDto.bike, {
      status: BikeStatus.IN_USE,
    } as any);

    await this.docksService.update(dock.id, {
      bikes: dock.bikes.filter(
        (bike) => bike.id !== createRentalDto.bike,
      ) as any,
    } as any);
    return this.rentalRepository.save(rental);
  }

  async getAllRentals(): Promise<Rental[]> {
    return this.rentalRepository.find();
  }

  async getRental(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ['bike', 'pricing'],
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }

    const currentTime = rental.returnDate || new Date();
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
      rental.pricing.id,
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

  async returnRental(id: number, returnBikeDto: ReturnBikeDto) {
    const currentRental = await this.getRental(id);
    const updatedRental = {
      returnDate: new Date(),
      amountPaid: (currentRental as any).currentPrice,
    };
    const response = await this.updateRental(id, updatedRental as any);

    const dock = await this.docksService.getDockDetail(returnBikeDto.dockId);
    console.log(dock.bikes.map((bike) => bike.id));
    await this.docksService.update(dock.id, {
      bikes: [...dock.bikes.map((bike) => bike.id), response.bike.id] as any,
    } as any);
    await this.bikeService.update(response.bike.id, {
      status: BikeStatus.FREE,
    } as any);
    return response;
  }

  // async returnBike(id: number): Promise<>;
}
