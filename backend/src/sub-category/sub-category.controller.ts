import { Controller, Get } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}
  @Get()
  async getAllSubCategories() {
    return this.subCategoryService.findAll({});
  }
}
