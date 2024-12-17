import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavoriteRecipesService } from './favorite-recipes.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request as ExpressRequest } from 'express';

interface RequestWithUser extends ExpressRequest {
  user: {
    userId: number;
  };
}

@Controller('favorites')
export class FavoriteRecipesController {
  constructor(private readonly favoriteRecipesService: FavoriteRecipesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':recipeId')
  async addFavorite(@Param('recipeId') recipeId: number, @Request() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.favoriteRecipesService.addFavorite(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':recipeId')
  async removeFavorite(@Param('recipeId') recipeId: number, @Request() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.favoriteRecipesService.removeFavorite(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserFavorites(@Request() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.favoriteRecipesService.getUserFavorites(userId);
  }
} 