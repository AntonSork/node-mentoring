import { User } from "./user";


export class Users {
  public list: User[] = [];

  public add(user: User): User {
    const newUser = new User(user);
    this.list.push(user);

    return newUser;
  }

  public delete(userId: string): User {
    const user = this._findUser(userId);
    user.isDeleted = true;

    return user;
  }

  public getUser(userId: string): User {
    return this._findUser(userId);
  }

  public updateUser(user: User): User {
    const { id } = user;
    const index = this._findUserIndex(id)
    const currentUser = this.list[index];
    this.list[index] = { ...currentUser, ...user };

    return this.list[index];
  }

  public getUsers(loginSubstring?: string, limit = 10): User[] {
    if (loginSubstring && limit) {
      const users = this._getNotDeletedUsers().filter(user => user.login.includes(loginSubstring));
      return users.sort((a, b) => a.login.localeCompare(b.login)).slice(0, limit);
    }
    return this._getNotDeletedUsers();
  }

  private _findUser(userId: string): User {
    return this.list[this._findUserIndex(userId)];
  }

  private _findUserIndex(userId: string): number {
    const userIndex = this._getNotDeletedUsers().findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error(`User ${userId} not found`);
    }
    return userIndex;
  }

  private _getNotDeletedUsers(): User[] {
    return this.list.filter(user => !user.isDeleted);
  }

}