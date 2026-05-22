import { apiFetch } from "@/lib/apis";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  name: string;
}

export const authServices = {
  register(data: IRegister) {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  login(data: ILogin) : Record<string,any> {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  logout() : Record<string,any> {
    return apiFetch("/auth/logout");
  },
  me() : Record<string,any> {
    return apiFetch("/auth/me");
  },
};
