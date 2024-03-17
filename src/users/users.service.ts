import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async findOneById(userId: string): Promise<User> {
    return await this.userModel.findById(userId);
  }
}
