import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty() 
  @MaxLength(120) 
  name!: string;
  
  @IsEmail() 
  email!: string;
}