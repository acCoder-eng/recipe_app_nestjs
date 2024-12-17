import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cuisines' })
export class Cuisine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
} 