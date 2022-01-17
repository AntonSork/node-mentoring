import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/index";

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FIlES'];
//convert array to union
type Permission = typeof permissions[number];

type GroupAttributes = {
  id?: string;
  name: string;
  permissions: Permission[];
}

export type GroupInput = Optional<GroupAttributes, 'id'>
export type GroupOutput = Required<GroupAttributes>

class Group extends Model<GroupAttributes, GroupInput> implements GroupAttributes {
  public id: string;
  public name: string;
  public permissions: Permission[];
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [4, 256],
        isAlphanumeric: true
      }
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isValidPermission: (values) => {
          if (!Array.isArray(values) || !values.every(value => permissions.includes(value))) {
            throw new Error('Invalid permission')
          }
          return values;
        },
      }
    }
  },
  {
    sequelize,
    tableName: 'groups',
    timestamps: false
  }
);

export { Group as GroupModel }