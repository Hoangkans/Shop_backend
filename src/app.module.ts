import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { CategoriesModule } from './module/category/category.module';
import { OrderModule } from './module/orders/order.module';
import { OrderDetailModule } from './module/order_detail/order_detail.module';
import { ShoppingCartModule } from './module/shopping_cart/shopping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/shop_backend',
    ),
    AuthModule,
    UserModule,
    ProductModule,
    CategoriesModule,
    OrderModule,
    OrderDetailModule,
    ShoppingCartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
