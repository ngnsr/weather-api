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
    const user = await this.repository.findOneBy({ email: email });
    if (!user) {
      await this.repository.save({ email });
    }

    return user;
  }
}
