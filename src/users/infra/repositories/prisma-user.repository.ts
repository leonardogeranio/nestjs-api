import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import { Email } from 'src/users/domain/value-objects/email.value-object';
import { UserRepository } from 'src/users/application/ports/user-repository.interface';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  
  constructor(private readonly prisma: PrismaService) {}
  
  async findById(id: number): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? new User(row.name, Email.create(row.email), row.id) : null;
  }

  async create(user: User): Promise<User> {
    const row = await this.prisma.user.create({
      data: { name: user.name, email: user.email.value },
    });
    return new User(row.name, Email.create(row.email), row.id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const c = await this.prisma.user.count({ where: { email } });
    return c > 0;
  }
}