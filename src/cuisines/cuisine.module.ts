import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuisine } from './entities/cuisine.entity';
import { CuisineService } from './cuisine.service';
import { CuisineController } from './cuisine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cuisine])],
  providers: [CuisineService],
  controllers: [CuisineController],
  exports: [TypeOrmModule],
})
export class CuisineModule {} 