import { createContext, useContext, useState } from "react";
import {
  login as loginService,
  signup as signupService,
} from "../services/authServices";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // handle login
  const login = async (email, password) => {
    const loggedInUser = await loginService(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  // handle signup
  const signup = async (name, email, password, passwordConfirm) => {
    const newUser = await signupService(name, email, password, passwordConfirm);
    setUser(newUser);
    return newUser;
  };

  // handle logout (calls your backend /logout API)
  const logout = async () => {
    await api.get("/users/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
