import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipeModule } from './recipes/recipe.module';
import { CountryModule } from './countries/country.module';
import { CuisineModule } from './cuisines/cuisine.module';
import { FavoriteRecipesModule } from './favorite-recipes/favorite-recipes.module';
import { RatingModule } from './ratings/rating.module';
import { CategoryModule } from './categories/category.module';
import { RecipeCategoryModule } from './recipe-categories/recipe-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    RecipeModule,
    CountryModule,
    CuisineModule,
    FavoriteRecipesModule,
    RatingModule,
    CategoryModule,
    RecipeCategoryModule,
  ],
})
export class AppModule {}