import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/module/user/user.controller';
import { UsersService } from 'src/module/user/user.service';
import { UserSchema } from 'src/shared/database/mongo/schemas/user.schema';
import { RoleSchema } from 'src/shared/database/mongo/schemas/role.schema';
import { UserRoleSchema } from 'src/shared/database/mongo/schemas/user-role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'UserRole', schema: UserRoleSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
