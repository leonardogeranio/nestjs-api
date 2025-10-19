import { Module } from '@nestjs/common';
import { UsersController } from './interface/http/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { USER_REPOSITORY } from './application/ports/user-repository.token';
import { PrismaUserRepository } from './infra/repositories/prisma-user.repository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    PrismaService,
    CreateUserUseCase,
  ],
})
export class UsersModule {}
