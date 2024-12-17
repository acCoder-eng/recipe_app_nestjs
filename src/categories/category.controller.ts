import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.findAll();
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    await this.categoryService.deleteCategory(id);
    return { message: 'Category deleted successfully' };
  }
} 