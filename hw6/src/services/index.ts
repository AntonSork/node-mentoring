import { Service } from './service';
import Models from "../models";
import { GroupInput, GroupOutput } from '../models/group.model';
import { UserToGroupService } from './user_group.service';
import { UserService } from './user.service';

export const userService = new UserService(Models.UserModel);
export const groupService = new Service<GroupInput, GroupOutput>(Models.GroupModel);
export const userGroupService = new UserToGroupService(Models.UserToGroupModel);