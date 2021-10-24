import { UserType } from "../types/user.type";
import { v4 as uuidv4 } from 'uuid';

export class User implements UserType {
  public id: string = uuidv4();
  public login: string;
  public password: string;
  public age: number;
  public isDeleted = false;

  constructor({ login, password, age }: User) {
    this.login = login;
    this.password = password;
    this.age = age;
  }
}
