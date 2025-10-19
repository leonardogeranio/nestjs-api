import { User } from "src/users/domain/entities/user.entity";

export class UserMapper {
  static toResponse(u: User) {
    return { id: u.id, name: u.name, email: u.email.value };
  }
}