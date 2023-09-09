import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    console.log(userData);

    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) return user;
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) return user;
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }
}
