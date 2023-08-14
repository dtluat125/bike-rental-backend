import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { Pricing } from 'src/pricings/entities/pricing.entity';
import { BikeType } from '../bike/constants';

@Injectable()
export class PricingsService {
  constructor(
    @InjectRepository(Pricing)
    private pricingRepository: Repository<Pricing>,
  ) {}

  async create(createPricingDto: CreatePricingDto): Promise<Pricing> {
    const pricing = this.pricingRepository.create(createPricingDto);
    return this.pricingRepository.save(pricing);
  }

  async findAll(): Promise<Pricing[]> {
    return this.pricingRepository.find();
  }

  async findOne(id: number): Promise<Pricing> {
    const pricing = await this.pricingRepository.findOne({ where: { id } });
    if (!pricing) {
      throw new NotFoundException(`Pricing with ID ${id} not found`);
    }
    return pricing;
  }

  async update(
    id: number,
    updatePricingDto: UpdatePricingDto,
  ): Promise<Pricing> {
    const pricing = await this.findOne(id);
    Object.assign(pricing, updatePricingDto);
    return this.pricingRepository.save(pricing);
  }

  async remove(id: number): Promise<void> {
    const pricing = await this.findOne(id);
    await this.pricingRepository.remove(pricing);
  }

  async calculateRentingPrice(
    durationInMinutes: number,
    bikeType: BikeType,
  ): Promise<number> {
    const activePricing = await this.pricingRepository.findOne({
      where: { active: true },
    });
    if (!activePricing) {
      throw new NotFoundException('Active pricing option not found');
    }

    let rentingPrice = 0;

    if (durationInMinutes > activePricing.freeThreshold) {
      if (durationInMinutes > activePricing.timeThreshold) {
        rentingPrice = activePricing.basePrice + activePricing.additionalPrice;

        const additionalDuration =
          durationInMinutes - activePricing.timeThreshold;
        const additionalIntervals = Math.ceil(additionalDuration / 15);
        const additionalPrice =
          additionalIntervals * activePricing.additionalPrice;

        rentingPrice += additionalPrice;
      }

      if (
        activePricing.refundRate &&
        durationInMinutes < activePricing.refundThreshold
      ) {
        const refundDuration =
          activePricing.refundThreshold - durationInMinutes;
        const refundAmount =
          Math.floor(refundDuration / 60) * activePricing.refundRate;
        rentingPrice -= refundAmount;
      }

      if (
        activePricing.lateFee &&
        durationInMinutes >
          activePricing.timeThreshold + activePricing.refundThreshold
      ) {
        const lateDuration =
          durationInMinutes -
          activePricing.timeThreshold -
          activePricing.refundThreshold;
        const lateFee = Math.ceil(lateDuration / 15) * activePricing.lateFee;
        rentingPrice += lateFee;
      }
    }
    if (bikeType !== BikeType.STANDARD) {
      rentingPrice *= 1.5;
    }

    return rentingPrice;
  }
}
