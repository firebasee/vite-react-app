import created from "zustand";
import baseService from "../services/baseService";

const useAuthStore = created((set) => ({
  isLoggedIn: JSON.parse(localStorage.getItem("token")) !== null ? true : false,
  login: async (username, password) => {
    const { data: token } = await baseService.post("auth/login", {
      username,
      password,
    });

    try {
      set((state) => ({
        ...state,
        isLoggedIn: true,
      }));

      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
  },
  logout: () => {
    set((state) => ({
      ...state,
      isLoggedIn: false,
    }));
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;
