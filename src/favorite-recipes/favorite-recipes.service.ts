import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

@Injectable()
export class FavoriteRecipesService {
  constructor(
    @InjectRepository(FavoriteRecipe)
    private favoriteRecipesRepository: Repository<FavoriteRecipe>,
  ) {}

  async addFavorite(userId: number, recipeId: number): Promise<FavoriteRecipe> {
    const favorite = this.favoriteRecipesRepository.create({ user_id: userId, recipe_id: recipeId });
    return this.favoriteRecipesRepository.save(favorite);
  }

  async removeFavorite(userId: number, recipeId: number): Promise<void> {
    await this.favoriteRecipesRepository.delete({ user_id: userId, recipe_id: recipeId });
  }

  async getUserFavorites(userId: number): Promise<FavoriteRecipe[]> {
    const favorites = await this.favoriteRecipesRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.recipe', 'recipe')
      .where('favorite.user_id = :userId', { userId })
      .getMany();

    return favorites;
  }
} 