import { sequelize } from "../db/connection";
import { UserToGroup, UserToGroupModel } from "../models/user_group.model";

export class UserToGroupService {
  private model;
  constructor(entityModel) {
    this.model = entityModel;
  }
  async addUsersToGroup(groupId: string, userIds: string[]) {
    const t = await sequelize.transaction();
    return sequelize.transaction((t) => {
      return Promise.all(userIds.map(async userId => {
        const user = new UserToGroup(userId, groupId)
        console.log(user);
        
        return this.model.create(user, { transaction: t });
      }))
    })
      .then(() => t.commit())
      .catch((e) => {
        console.log(e);
        
        t.rollback()
      });
  }
}