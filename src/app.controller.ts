/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtStrategy } from './authorization/authorization.strategy';
import { PermissionsGuard } from './authorization/permission.guard';
import { MessagesPermissions } from './authorization/permission.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(JwtStrategy)
  @Get('/user1')
  getuser1(): string {
    return this.appService.getuser1();
  }
  @UseGuards(JwtStrategy)
  @Get('/user2')
  getuser2(): string {
    return this.appService.getuser2();
  }
  @UseGuards(PermissionsGuard([MessagesPermissions.READ_ADMIN]))
  @Get('/admin')
  async getAdmin(): Promise<any> {
    console.log('inside async admin functrion ');
    return this.appService.getadmin();
  }
}
