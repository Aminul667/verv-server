import { Model } from "mongoose";

export type TTenant = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  about: string;
  role: "superAdmin" | "admin" | "landlord" | "tenant";
  profileImg?: string;
  isDeleted: boolean;
};

export interface TenantModel extends Model<TTenant> {
  // eslint-disable-next-line no-unused-vars
  isTenantExists(email: string): Promise<TTenant | null>;
}
