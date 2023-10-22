import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ShopDTO } from './dto/shop.dto';
import { Product } from '.prisma/client';

@Injectable()
export class ShopService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloudinary: CloudinaryService,
    ) {}

    async createProductWithImage(shopDTO: ShopDTO, file: Express.Multer.File): Promise<Product> {
        try {
            const result = await this.cloudinary.uploadFile(file);

            const product = await this.prisma.product.create({
                data: {
                    name: shopDTO.name,
                    price: shopDTO.price,
                    qty: shopDTO.qty,
                    image: result.public_id,
                    deliveryDay: shopDTO.deliveryDay,
                },
            });

            await this.prisma.shopping.create({
                data: {
                    title: shopDTO.title,
                    content: shopDTO.content,
                    category: shopDTO.category,
                    discount: shopDTO.discount,
                    productId: Number(product.id),
                },
            });

            return product;
        } catch (error) {
            throw new Error(`상품 생성 중 오류 발생: ${error.message}`);
        }
    }

    async getProductDetails(productId: string): Promise<Product | null> {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: parseInt(productId),
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    image: true,
                    createdAt: true,
                    qty: true,
                    deliveryDay: true,
                },
            });

            return product || null;
        } catch (error) {
            throw new Error(`상품 정보를 가져오는 중 오류 발생: ${error.message}`);
        }
    }
}
