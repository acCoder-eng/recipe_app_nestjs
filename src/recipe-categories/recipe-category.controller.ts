import { Controller, Post, Delete, Get, Param } from '@nestjs/common';
import { RecipeCategoryService } from './recipe-category.service';

@Controller('recipe-categories')
export class RecipeCategoryController {
  constructor(private readonly recipeCategoryService: RecipeCategoryService) {}

  @Post(':recipeId/:categoryId')
  async addCategoryToRecipe(@Param('recipeId') recipeId: number, @Param('categoryId') categoryId: number) {
    return this.recipeCategoryService.addCategoryToRecipe(recipeId, categoryId);
  }

  @Delete(':recipeId/:categoryId')
  async removeCategoryFromRecipe(@Param('recipeId') recipeId: number, @Param('categoryId') categoryId: number) {
    return this.recipeCategoryService.removeCategoryFromRecipe(recipeId, categoryId);
  }

  @Get(':recipeId')
  async getCategoriesForRecipe(@Param('recipeId') recipeId: number) {
    return this.recipeCategoryService.getCategoriesForRecipe(recipeId);
  }
}