import { Model } from "mongoose";

export type TLandlord = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  about: string;
  role: "superAdmin" | "admin" | "landlord" | "tenant";
  profileImg?: string;
  isDeleted: boolean;
};

export interface LandlordModel extends Model<TLandlord> {
  // eslint-disable-next-line no-unused-vars
  isLandlordExists(email: string): Promise<TLandlord | null>;
}

//   create profile
