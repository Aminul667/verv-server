import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// 20Dec2024 start
const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  const { refreshToken, accessToken, isProfileCompleted } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered in successfully!",
    data: {
      accessToken,
      refreshToken,
      isProfileCompleted,
    },
  });
});

// 20Dec2024 end

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, isProfileCompleted } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in Successfully!",
    data: {
      accessToken,
      refreshToken,
      isProfileCompleted,
    },
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
