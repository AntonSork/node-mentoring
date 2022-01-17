import { GroupModel } from './group.model';
import { UserModel } from './user.model';
import { UserToGroupModel } from './user_group.model';


UserModel.belongsToMany(GroupModel, { through: UserToGroupModel, foreignKey: "user_id" });
GroupModel.belongsToMany(UserModel, { through: UserToGroupModel, foreignKey: "group_id" });


export default {
  GroupModel, UserModel, UserToGroupModel
};

