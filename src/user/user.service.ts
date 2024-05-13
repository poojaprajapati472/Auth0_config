import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { user } from './user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(user.name)
    private userModel: mongoose.Model<user>,
  ) {}
  private readonly users: User[] = [
    {
      username: 'emily',
      password: 'ewrtyuii',
      provider: 'auth0',
    },
    {
      username: 'joseph',
      password: 'lkgrtyuiohg',
      provider: 'auth0',
    },
  ];

  async findOne(filterFn: (user: User) => boolean): Promise<User | undefined> {
    return this.users.find(filterFn);
  }
  async add(user: User) {
    const userData = { ...user };
    this.users.push(userData);
    return userData;
  }
}
