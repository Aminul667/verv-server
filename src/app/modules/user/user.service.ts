import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser, TUserProfile } from "./user.interface";
import { User } from "./user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { Landlord } from "../Landlord/landlord.model";

// create a user and save the data to the database
const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!");
  }

  const result = await User.create(payload);
  return result;
};

// create a profile for the user and save the data to the database
const createUserProfileIntoDB = async (payload: TUserProfile) => {
  // check whether the user exists in landlord database
  const checkLandlordEmail = await Landlord.isLandlordExists(payload.email);
  if (checkLandlordEmail) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!");
  }

  // check if user email match in both landlord/tenant and user database
  const checkUserEmail = await User.isUserExistsByEmail(payload.email);
  if (!checkUserEmail) {
    throw new AppError(httpStatus.CONFLICT, "Email doesn't match");
  }

  // update the role in user database
  const role = payload.role;
  await User.updateOne(
    { email: payload.email },
    { role: role, isProfileCompleted: true }
  );

  if (role == "landlord") {
    const result = await Landlord.create(payload);
    return result;
  } else if (role == "tenant") {
    // const result = await Landlord.create(payload);
    // return result;
    console.log("Tenant will be created");
    return { message: "Tenant will be created" };
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid User Role");
  }
};

// retrieve all users from the database
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

// retrieve a single user from the database
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
  createUserProfileIntoDB,
};
