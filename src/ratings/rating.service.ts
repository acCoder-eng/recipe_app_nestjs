import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async addRating(userId: number, recipeId: number, ratingValue: number): Promise<Rating> {
    const rating = this.ratingRepository.create({ user: { id: userId }, recipe: { id: recipeId }, rating: ratingValue });
    return this.ratingRepository.save(rating);
  }

  async getRatingsForRecipe(recipeId: number): Promise<Rating[]> {
    return this.ratingRepository.find({ where: { recipe: { id: recipeId } } });
  }

  async getAverageRatingForRecipe(recipeId: number): Promise<number> {
    const ratings = await this.ratingRepository.find({ where: { recipe: { id: recipeId } } });
    if (ratings.length === 0) return 0;

    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  }
}
