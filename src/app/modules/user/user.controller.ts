import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

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

export const UserControllers = {
  createUser,
};
