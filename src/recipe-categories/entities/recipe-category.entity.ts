import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'recipe_categories' })
export class RecipeCategory {
  @PrimaryColumn()
  recipe_id: number;

  @PrimaryColumn()
  category_id: number;

  @ManyToOne(() => Recipe, recipe => recipe.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Category, category => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
} 