import { Service } from './service';
import { UserInput, UserModel, UserOutput } from "../models";

export const userService = new Service<UserInput, UserOutput>(UserModel);