import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':recipeId')
  async addRating(
    @Param('recipeId') recipeId: number,
    @Body('rating') rating: number,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.ratingService.addRating(userId, recipeId, rating);
  }

  @Get(':recipeId')
  async getRatings(@Param('recipeId') recipeId: number) {
    return this.ratingService.getRatingsForRecipe(recipeId);
  }

  @Get(':recipeId/average')
  async getAverageRating(@Param('recipeId') recipeId: number) {
    return this.ratingService.getAverageRatingForRecipe(recipeId);
  }
}
