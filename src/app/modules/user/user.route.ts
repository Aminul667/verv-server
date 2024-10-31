import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

// will call controller function
router.post(
  "/create-user",
  validateRequest(userValidationSchema),
  UserControllers.createUser
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
