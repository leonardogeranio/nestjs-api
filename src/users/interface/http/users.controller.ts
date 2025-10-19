import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.usecase';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ConflictError } from 'src/shared/errors/conflict.error';

@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateUserDTO) {
    const result = await this.createUser.execute(dto);
    if (!result.ok) {
      if (result.error instanceof ConflictError) throw new ConflictException(result.error.message);
      throw result.error;
    }
    return { id: result.value.id };
  }
}