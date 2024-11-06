import { model, Schema } from "mongoose";
import { TenantModel, TTenant } from "./tenant.interface";

const tenantSchema = new Schema<TTenant, TenantModel>(
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
tenantSchema.virtual("fullName").get(function () {
  return this?.firstName + " " + this?.lastName;
});

//creating a custom static method
tenantSchema.statics.isTenantExists = async function (email: string) {
  const existingTenant = await Tenant.findOne({ email });
  return existingTenant;
};

export const Tenant = model<TTenant, TenantModel>("Tenant", tenantSchema);
