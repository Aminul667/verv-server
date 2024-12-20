export type TLoginUser = {
  email: string;
  password: string;
};

// 20Dec2024 start

export interface TRegisterUser {
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "superAdmin" | "admin" | "landlord" | "tenant";
  status: "in-progress" | "blocked";
  isProfileCompleted: boolean;
  isDeleted: boolean;
}

// 20Dec2024 end
