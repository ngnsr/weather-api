import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  get() {
    return this.repository;
  }

  async findOrSave(email: string) {
    let user = await this.repository.findOne({
      where: { email },
      relations: ['subscriptions'],
    });
    console.log('before');
    console.log(user);
    if (!user) {
      console.log('here');
      user = await this.repository.save({ email });
      console.log(user);
    }
    return user;
  }
}
