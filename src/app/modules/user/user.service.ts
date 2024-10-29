import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!");
  }

  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
