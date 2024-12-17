import { Controller, Get, Post, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getAllRecipes() {
    return this.recipeService.getRecipesWithDetails();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async addRecipe(
    @Body() recipeData: Partial<Recipe>,
    @Body('countryId') countryId: number,
    @Body('cuisineId') cuisineId: number,
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const userId = req.user.userId;
    return this.recipeService.createRecipe({ ...recipeData, user: { id: userId } }, image.buffer, countryId, cuisineId);
  }
} 