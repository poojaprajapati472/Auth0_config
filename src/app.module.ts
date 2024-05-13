import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { JwtStrategy } from './authorization/authorization.strategy';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { user, user_schema } from './user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '@twirelab/nestjs-auth0';

@Module({
  imports: [
    AuthenticationModule.forRoot({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    }),
    MongooseModule.forFeature([{ name: user.name, schema: user_schema }]),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthorizationModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  constructor() {
    console.log('This is user module ');
  }
}
