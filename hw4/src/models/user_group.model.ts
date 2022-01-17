import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../db/index"
import { GroupModel } from "./group.model"
import { UserModel } from "./user.model"

type UserToGroupAttributes = {
  id?: string;
  user_id: string;
  group_id: string;
}

export type UserToGroupInput = Optional<UserToGroupAttributes, 'id'>
export type UserToGroupOutput = Required<UserToGroupAttributes>

export class UserToGroup implements UserToGroupAttributes {
  public user_id: string;
  public group_id: string;
  constructor(userId: string, groupId: string) {
    this.user_id = userId;
    this.group_id = groupId;
  }
}

class UserToGroupModel extends Model<UserToGroupAttributes, UserToGroupInput> implements UserToGroupAttributes {
  public id: string;
  public user_id: string;
  public group_id: string;
}

UserToGroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserModel,
        key: 'id'
      }
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: GroupModel,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'usergroup',
    timestamps: false
  }
);

export { UserToGroupModel }