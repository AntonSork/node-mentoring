import { Service } from './service';
import { UserModel, UserInput, UserOutput } from "../models";

export const userService = new Service<UserInput, UserOutput>(UserModel);