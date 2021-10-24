import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export const userSchema: Joi.Schema = Joi.object({
  id: Joi.string().optional(),
  login: Joi.string().required(),
  password: Joi.string().pattern(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/).required().messages({"string.pattern.base": "password must contain letters and numbers"}),
  age: Joi.number().min(4).max(130).required(),
})

export interface UserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: string,
    login: string,
    password: string,
    age: string,
  }
}