import { Module } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';

@Module({
  providers: [ProductService, PrismaService],
  imports: [ProductModule],

})
export class AppModule {}