import { instance } from "common/api/common.api";
import { ResponseType } from "common/types/common.types";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me");
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
