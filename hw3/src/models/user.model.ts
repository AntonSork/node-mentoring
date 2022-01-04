import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../db"

type UserAttributes = {
  id?: string;
  login: string;
  password: string;
  age: number;
  isdeleted?: boolean;
}

export type UserInput = Optional<UserAttributes, 'id' | 'isdeleted'>
export type UserOutput = Required<UserAttributes>

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id: string;
  public login: string;
  public password: string;
  public age: number;
  public isdeleted: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [4,256],
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/,
        notEmpty: true,
        len: [4,99999]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        max: 130,
        min: 4
      }
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false
  }
);

export { User as UserModel }