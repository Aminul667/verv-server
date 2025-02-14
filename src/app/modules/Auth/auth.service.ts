// import bcrypt from "bcrypt";
import httpStatus from "http-status";
// import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
// import { sendEmail } from '../../utils/sendEmail';
import { TLoginUser, TRegisterUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import { User } from "../User/user.model";

// 20Dec2024 start
const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already exist!");
  }

  // payload.role = USER_ROLE.USER;

  //create new user
  const newUser = await User.create(payload);

  //create token and send to the  client

  const jwtPayload = {
    userEmail: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  // console.log(refreshToken);

  return {
    accessToken,
    refreshToken,
    isProfileCompleted: newUser?.isProfileCompleted,
  };
};

// 20Dec2024 end

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and send to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  console.log(refreshToken);

  return {
    accessToken,
    refreshToken,
    isProfileCompleted: user?.isProfileCompleted,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
