import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
} 