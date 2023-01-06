import { defineStore } from "pinia";
import { AuthUser } from "../interfaces/auth";

const useAuthUserStore = defineStore("authUser", {
  state: (): { authUser: AuthUser } => {
    return {
      authUser: {
        email: "",
        token: "",
        type: 0,
      },
    };
  },
  actions: {
    auth(user: AuthUser) {
      this.authUser = user;
      sessionStorage.setItem("authUser", JSON.stringify(user));
    },
    init() {
      const user = JSON.parse(sessionStorage.getItem("authUser") || "{}");
      if (user?.token) {
        this.authUser = user;
      }
    },
    logout() {
      sessionStorage.removeItem("authUser");
      this.authUser = { email: "", token: "", type: 0 };
    },
  },
});

export { useAuthUserStore };
