export type UserRole = "user" | "admin";

export type User = {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role: UserRole;
};
