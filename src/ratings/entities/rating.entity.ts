import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'ratings' })
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => Recipe, recipe => recipe.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
