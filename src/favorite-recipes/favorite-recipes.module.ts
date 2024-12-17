import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteRecipesService } from './favorite-recipes.service';
import { FavoriteRecipesController } from './favorite-recipes.controller';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteRecipe])],
  providers: [FavoriteRecipesService],
  controllers: [FavoriteRecipesController],
})
export class FavoriteRecipesModule {} 