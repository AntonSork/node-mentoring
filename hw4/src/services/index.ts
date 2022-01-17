import { Service } from './service';
import Models from "../models";
import { GroupInput, GroupOutput } from '../models/group.model';
import { UserInput, UserOutput } from '../models/user.model';

export const userService = new Service<UserInput, UserOutput>(Models.UserModel);
export const groupService = new Service<GroupInput, GroupOutput>(Models.GroupModel);