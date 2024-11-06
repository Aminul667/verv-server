import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

// 1. Create an interface representing a document in MongoDB.

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "superAdmin" | "admin" | "landlord" | "tenant" | "user";
  status: "in-progress" | "blocked";
  isProfileCompleted: boolean;
  isDeleted: boolean;
}

export type TUserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  about: string;
  role: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
