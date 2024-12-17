import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCategory } from './entities/recipe-category.entity';
import { RecipeCategoryService } from './recipe-category.service';
import { RecipeCategoryController } from './recipe-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeCategory])],
  providers: [RecipeCategoryService],
  controllers: [RecipeCategoryController],
})
export class RecipeCategoryModule {} 