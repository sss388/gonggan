import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import {CloudinaryModule} from "../cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
