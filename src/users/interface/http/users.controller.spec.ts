import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';

describe('UsersController', () => {
  let controller: UsersController;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const useCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateUserUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: CreateUserUseCase, useValue: useCaseMock },],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
