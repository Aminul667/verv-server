import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

// create a user and save into database
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UserServices.createUserIntoDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully!!",
    data: result,
  });
});

// create a user profile and save the data into database
const createUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { userProfile } = req.body;
  const result = await UserServices.createUserProfileIntoDB(userProfile);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Profile created Successfully!!",
    data: result,
  });
});

// retrieve all users from the database
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

// retrieve a single user from the database
const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getSingleUserFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved Successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userEmail, role } = req.user;

  console.log(userEmail, role, res);

  // console.log("from controller", req.user);

  // const result = await UserServices.getMe(userEmail, role);

  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: "User is retrieved Successfully",
  //   data: result,
  // });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  createUserProfile,
  getMe,
};
