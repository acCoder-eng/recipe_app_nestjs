import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuisine } from './entities/cuisine.entity';

@Injectable()
export class CuisineService {
  constructor(
    @InjectRepository(Cuisine)
    private cuisineRepository: Repository<Cuisine>,
  ) {}

  async findAll(): Promise<Cuisine[]> {
    return this.cuisineRepository.find();
  }
} 