import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";
// import { landlordValidationSchema } from "../Landlord/landlord.validation";
import { userValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser
);

router.post(
  "/create-profile",
  validateRequest(userValidations.userProfileValidationSchema),
  UserControllers.createUserProfile
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllUsers
);

router.get(
  "/:email",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getSingleUser
);

export const UserRoutes = router;
