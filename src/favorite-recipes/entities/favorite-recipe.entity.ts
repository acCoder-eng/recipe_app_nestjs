import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity({ name: 'favorite_recipes' })
export class FavoriteRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  recipe_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Recipe, recipe => recipe.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
} 