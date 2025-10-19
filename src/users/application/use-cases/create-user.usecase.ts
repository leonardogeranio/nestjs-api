import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../ports/user-repository.interface';
import { USER_REPOSITORY } from '../ports/user-repository.token';
import { User } from 'src/users/domain/entities/user.entity';
import { Email } from 'src/users/domain/value-objects/email.value-object';
import { ConflictError } from 'src/shared/errors/conflict.error';
import { err, ok, Result } from 'src/shared/application/result';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: UserRepository,
    // injete também um TransactionManager se precisar
  ) {}

  async execute(input: { name: string; email: string }): Promise<Result<{ id: number }, Error>> {
    const email = Email.create(input.email);
    const exists = await this.repo.existsByEmail(email.value);
    if (exists) return err(new ConflictError('email already used'));

    const user = User.createNew(input.name, email);
    try {
        const created = await this.repo.create(user);
        if (created.id === undefined) {
          return err(new Error('Failed to create user: missing id'));
        }
        return ok({ id: created.id });
      } catch (error) {
        return err(new Error('Failed to create user'));
      }
  }
}