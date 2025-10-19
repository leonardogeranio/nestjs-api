import { Email } from "../value-objects/email.value-object";

export class User {

  constructor(
    public name: string,
    public email: Email,
    public readonly id?: number,
  ) {}
  
  static createNew(name: string, email: Email, id?: number): User {
    return new User(name.trim(), email, id);
  }
}