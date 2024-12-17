import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async registerUser(username: string, email: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, email, password_hash: passwordHash });
    return this.usersRepository.save(newUser);
  }
}
