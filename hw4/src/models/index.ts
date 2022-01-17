import { GroupModel } from './group.model';
import { UserModel } from './user.model';
import { UserToGroupModel } from './user_group.model';


UserModel.belongsToMany(GroupModel, { through: UserToGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserToGroupModel });

export default {
  GroupModel, UserModel, UserToGroupModel
};

