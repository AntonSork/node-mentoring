import { UserInput, UserOutput } from "../models/user.model";
import { Service } from "./service";

export class UserService extends Service<UserInput, UserOutput> {
  constructor(entityModel) {
    super(entityModel);
  }

  public async getUserByLogin(login: string): Promise<UserOutput> {
    const options = {
      where: {
        login,
        isdeleted: false,
      }
    };

    const entity = await this.model.findOne(options);
    return entity?.dataValues;
  }
}