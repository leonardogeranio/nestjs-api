import { User } from "src/users/domain/entities/user.entity";

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  existsByEmail(email: string): Promise<boolean>;
}