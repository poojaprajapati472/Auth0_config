// import { Controller, Post, Body, Res } from '@nestjs/common';
// import { UserService } from './user.service';
// // import { User } from './entities/user.entity';

// @Controller('/user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   // @Post()
//   // async addUser(@Body() user: User): Promise<User> {
//   //   console.log(user, 'user-----------------------------------------');
//   //   return this.userService.add(user);
//   // }
//   @Post('/signup')
//   async signup(@Res() res: Response, @Body() user_details: CreateUserDto) {
//     try {
//       const newUser = await this.userService.createUser(user_details);
//       console.log(newUser);
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// interface CreateUserDto {
//   username: string;
//   password: string;
//   email: string;
//   role: string;
// }
