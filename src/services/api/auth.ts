import axios from "axios";
import { AuthLogin, AuthRegister, AuthUser } from "../../interfaces/auth";

const loginApi = async (user: AuthLogin): Promise<AuthUser> => {
  return axios
    .post("/auth/login", user)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e.response || e.message);
    });
};

const signupApi = async (user: AuthRegister): Promise<AuthUser> => {
  return axios
    .post("/auth/signup", user)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e.response || e.message);
    });
};

export { loginApi, signupApi };
