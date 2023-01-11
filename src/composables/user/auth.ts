import axios from "axios";
import { AuthLogin, AuthRegister, AuthUser } from "../../interfaces/auth";
import { loginApi, signupApi } from "../../services/api/auth";
import { useAuthUserStore } from "../../store/user";

const useUser = () => {
  const authUserStore = useAuthUserStore();

  const auth = (user: AuthUser) => {
    if (user.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
      authUserStore.auth(user);
    }
  };

  const logout = () => {
    axios.defaults.headers.common.Authorization = "";
    authUserStore.logout();
  };
  const login = async (user: AuthLogin) => {
    return loginApi(user).then((data) => {
      auth(data);
    });
  };

  const signup = async (user: AuthRegister) => {
    return signupApi(user).then((data) => {
      auth(data);
    });
  };

  const init = () => {
    authUserStore.init();
    if (authUserStore.authUser.token) {
      auth(authUserStore.authUser);
    }
  };

  return { login, signup, init, logout, auth: authUserStore.authUser };
};

export { useUser };
