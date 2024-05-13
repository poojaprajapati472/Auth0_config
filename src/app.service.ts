import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getuser1(): string {
    return 'This is user1';
  }
  getuser2(): string {
    return 'This is user2';
  }
  getadmin(): string {
    return 'This is admin';
  }
}
