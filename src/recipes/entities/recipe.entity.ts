import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Country } from '../../countries/entities/country.entity';
import { Cuisine } from '../../cuisines/entities/cuisine.entity';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  ingredients: string;

  @Column()
  prep_time: number;

  @Column()
  cook_time: number;

  @Column()
  servings: number;

  @Column()
  calories: number;

  @Column('decimal', { precision: 5, scale: 2 })
  protein: number;

  @Column('decimal', { precision: 5, scale: 2 })
  carbs: number;

  @Column('decimal', { precision: 5, scale: 2 })
  fat: number;

  @Column('decimal', { precision: 5, scale: 2 })
  sugar: number;

  @Column('decimal', { precision: 5, scale: 2 })
  fiber: number;

  @Column()
  image_url: string;

  @Column({ default: 0 })
  view_count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  @ManyToOne(() => Country, country => country.id, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne(() => Cuisine, cuisine => cuisine.id, { nullable: true })
  @JoinColumn({ name: 'cuisine_id' })
  cuisine: Cuisine;
} 