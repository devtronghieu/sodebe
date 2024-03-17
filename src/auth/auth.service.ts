import { hash, compare } from 'bcryptjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { saltRounds } from './constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException();
    }

    const passwordHash = await hash(password, saltRounds);
    const samePassword = await compare(passwordHash, user.passwordHash);

    if (samePassword) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
