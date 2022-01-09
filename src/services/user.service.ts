import userModel from "../models/user.model";
import { CreateUser, PostUser } from "../typings/interfaces";
import { hashPassword } from "../utils/hashPassword";
import { customAlphabet } from "nanoid/async";

export async function saveUser(params: PostUser) {
  try {
    const nanoid = customAlphabet("0123456789", 6);

    const createUser = <CreateUser>{
      ...params,
      password: await hashPassword(params.password),
      code: +(await nanoid()),
    };
    const data = await userModel.create(createUser);

    return data;
  } catch (error) {
    throw error;
  }
}
