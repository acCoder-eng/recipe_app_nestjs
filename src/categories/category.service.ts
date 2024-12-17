import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Category name cannot be empty');
    }

    const existingCategory = await this.categoryRepository.findOne({ where: { name } });
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
} 