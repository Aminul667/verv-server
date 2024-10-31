import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchableFields } from "./user.constant";

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!");
  }

  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
