import { Controller, Get } from '@nestjs/common';
import { CuisineService } from './cuisine.service';

@Controller('cuisines')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @Get()
  async getAllCuisines() {
    return this.cuisineService.findAll();
  }
} 