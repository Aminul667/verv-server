export const userSearchableFields = [
  "email",
  "name.firstName",
  "name.lastName",
  "presentAddress",
  "role",
];

export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
  landlord: "landlord",
  tenant: "tenant",
} as const;

export const UserStatus = ["in-progress", "blocked"];
