import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import instance from "../axios/instance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = Cookies.get("userToken");

  const [user, setUser] = useState({
    isLoggedIn: !!initialToken,
    userToken: initialToken,
  });

  const signup = async (inputValues) => {
    try {
      const response = await instance.post("/signup", inputValues);
      if (response.status && response.data.token) {
        setUser((user) => ({
          ...user,
          isLoggedIn: true,
          userToken: response.data.token,
        }));

        Cookies.set("userToken", response.data.token, {
          sameSite: "None",
          secure: true,
          expires: 1,
        });
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const login = async (inputValues) => {
    try {
      const response = await instance.post("/login", inputValues);
      if (response.status && response.data.token) {
        setUser((user) => ({
          ...user,
          isLoggedIn: true,
          userToken: response.data.token,
        }));

        Cookies.set("userToken", response.data.token, {
          sameSite: "None",
          secure: true,
          expires: 1,
        });

        console.log(user);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const logout = async () => {
    try {
      setUser((user) => ({
        ...user,
        isLoggedIn: false,
        userToken: null,
      }));

      Cookies.remove("userToken", {
        sameSite: "None",
        secure: true,
      });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
