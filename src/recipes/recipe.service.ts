import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { MinioService } from '../minio/minio.service';
import { Country } from '../countries/entities/country.entity';
import { Cuisine } from '../cuisines/entities/cuisine.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    private minioService: MinioService,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Cuisine)
    private cuisineRepository: Repository<Cuisine>,
  ) {}

  async getRecipesWithDetails() {
    return this.recipeRepository.query(`
      SELECT 
        recipes.id,
        recipes.name,
        recipes.description,
        recipes.ingredients,
        recipes.prep_time,
        recipes.cook_time,
        recipes.servings,
        recipes.calories,
        recipes.protein,
        recipes.carbs,
        recipes.fat,
        recipes.sugar,
        recipes.fiber,
        recipes.image_url,
        recipes.view_count,
        recipes.created_at,
        users.username AS author,
        countries.name AS country_name,
        cuisines.name AS cuisine_name
      FROM 
        recipes
      JOIN 
        users ON recipes.user_id = users.id
      LEFT JOIN 
        countries ON recipes.country_id = countries.id
      LEFT JOIN 
        cuisines ON recipes.cuisine_id = cuisines.id;
    `);
  }

  async createRecipe(recipeData: Partial<Recipe>, imageFile: Buffer, countryId: number, cuisineId: number): Promise<Recipe> {
    const bucketName = 'recipe-images';
    const objectName = `${Date.now()}-${recipeData.name}.jpg`;

    await this.minioService.uploadImage(bucketName, objectName, imageFile, {
      'Content-Type': 'image/jpeg',
    });

    const imageUrl = this.minioService.getImageUrl(bucketName, objectName);

    // Fetch the full Country and Cuisine entities
    const country = await this.countryRepository.findOne({ where: { id: countryId } });
    const cuisine = await this.cuisineRepository.findOne({ where: { id: cuisineId } });

    const newRecipe = this.recipeRepository.create({ ...recipeData, image_url: imageUrl, country, cuisine });
    return this.recipeRepository.save(newRecipe);
  }
} 