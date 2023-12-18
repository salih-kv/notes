import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import instance from "../axios/instance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = Cookies.get("userToken");
  // const existingUser = localStorage.getItem("user");

  const [authState, setAuthState] = useState({
    isLoggedIn: !!initialToken,
    userToken: initialToken,
  });

  const [user, setUser] = useState();

  const signup = async (inputValues) => {
    try {
      const response = await instance.post("/signup", inputValues);
      if (response.status && response.data.token) {
        setAuthState((authState) => ({
          ...authState,
          isLoggedIn: true,
          userToken: response.data.token,
        }));

        setUser(response.data.user);

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
        setAuthState((authState) => ({
          ...authState,
          isLoggedIn: true,
          userToken: response.data.token,
        }));

        setUser(response.data.user);

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

  const logout = async () => {
    try {
      setAuthState((authState) => ({
        ...authState,
        isLoggedIn: false,
        userToken: null,
      }));

      setUser(() => null);

      Cookies.remove("userToken", {
        sameSite: "None",
        secure: true,
      });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
