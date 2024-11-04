import { Schema } from "mongoose";
import { LandlordModel, TLandlord } from "./landlord.interface";

const landlordSchema = new Schema<TLandlord, LandlordModel>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
