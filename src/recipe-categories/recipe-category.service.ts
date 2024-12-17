import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeCategory } from './entities/recipe-category.entity';

@Injectable()
export class RecipeCategoryService {
  constructor(
    @InjectRepository(RecipeCategory)
    private recipeCategoryRepository: Repository<RecipeCategory>,
  ) {}

  async addCategoryToRecipe(recipeId: number, categoryId: number): Promise<RecipeCategory> {
    const recipeCategory = this.recipeCategoryRepository.create({ recipe_id: recipeId, category_id: categoryId });
    return this.recipeCategoryRepository.save(recipeCategory);
  }

  async removeCategoryFromRecipe(recipeId: number, categoryId: number): Promise<void> {
    await this.recipeCategoryRepository.delete({ recipe_id: recipeId, category_id: categoryId });
  }

  async getCategoriesForRecipe(recipeId: number): Promise<RecipeCategory[]> {
    return this.recipeCategoryRepository.find({
      where: { recipe_id: recipeId },
      relations: ['category', 'recipe'],
    });
  }
}