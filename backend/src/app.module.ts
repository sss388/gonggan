import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ShopModule } from './shop/shop.module';
import { CommunityModule } from './community/community.module';
import { AdminModule } from './admin/admin.module';
import { DeliveryModule } from './delivery/delivery.module';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        UserModule,
        AuthModule,
        CloudinaryModule,
        ShopModule,
        AdminModule,
        CommunityModule,
        DeliveryModule,
        PaymentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
