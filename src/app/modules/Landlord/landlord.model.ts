import { model, Schema } from "mongoose";
import { LandlordModel, TLandlord } from "./landlord.interface";

const landlordSchema = new Schema<TLandlord, LandlordModel>(
  {
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
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "landlord", "tenant"],
    },
    profileImg: { type: String, default: "" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//virtual
landlordSchema.virtual("fullName").get(function () {
  return this?.firstName + " " + this?.lastName;
});

//creating a custom static method
landlordSchema.statics.isLandlordExists = async function (email: string) {
  const existingLandlord = await Landlord.findOne({ email });
  return existingLandlord;
};

export const Landlord = model<TLandlord, LandlordModel>(
  "Landlord",
  landlordSchema
);
