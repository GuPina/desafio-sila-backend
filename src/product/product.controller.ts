import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Omit<Product, 'id'>) {
    const createdProduct = this.productService.create(product);
    console.log('Produto criado com sucesso:', createdProduct);
    return createdProduct;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Product>) {
    const updatedProduct = this.productService.update(Number(id), updateData);
    return updatedProduct;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}