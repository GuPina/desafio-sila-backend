import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Encontrar todos os produtos
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  // Encontrar um produto específico pelo ID
  async findOne(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  // Criar um novo produto
  async create(product: { nome: string; descricao: string; preco: number }): Promise<Product> {
    if (!product.nome || product.nome.trim() === '') {
      throw new HttpException('O nome do produto não pode ser vazio', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.product.create({
      data: product,
    });
  }

  // Atualizar um produto existente
  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  // Deletar um produto
  async delete(id: number): Promise<boolean> {
    const product = await this.findOne(id);
    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    await this.prisma.product.delete({
      where: { id },
    });
    return true;
  }
}