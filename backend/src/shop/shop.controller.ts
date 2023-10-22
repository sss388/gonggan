import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShopService } from './shop.service';
import { ShopDTO } from './dto/shop.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Post('createProductWithImage')
    @UseInterceptors(FileInterceptor('file'))
    async createProductWithImage(
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('name') name: string,
        @Body('price', ParseIntPipe) price: number,
        @Body('qty', ParseIntPipe) qty: number,
        @Body('content') content: string,
        @Body('productId', ParseIntPipe) productId: number,
        @Body('category') category: string,
        @Body('deliveryDay', ParseIntPipe) deliveryDay: number,
        @Body('discount', ParseIntPipe) discount: number,
    ) {
        const shopDTO = { title, name, price, qty, content, productId, category, deliveryDay, discount };
        return await this.shopService.createProductWithImage(shopDTO, file);
    }

    @Get(':productId')
    async getProductDetails(@Param('productId') productId: string) {
        const productDetails = await this.shopService.getProductDetails(productId);
        return productDetails;
    }
}