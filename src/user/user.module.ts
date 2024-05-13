import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { user, user_schema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: user_schema }]),
  ],
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
