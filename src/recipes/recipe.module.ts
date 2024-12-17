import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { MinioModule } from '../minio/minio.module';
import { CountryModule } from '../countries/country.module';
import { CuisineModule } from '../cuisines/cuisine.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), MinioModule, CountryModule, CuisineModule],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {} 