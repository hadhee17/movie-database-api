import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  signup as signupService,
} from "../services/authServices";
import { getCurrentUser } from "../services/authServices"; // ✅ import your get-me API
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ to manage session load

  // ✅ Fetch current user when app starts or refreshes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // calls /users/get-me
        setUser(currentUser);
      } catch (err) {
        setUser(null); // no session or expired
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ handle login
  const login = async (email, password) => {
    const loggedInUser = await loginService(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  // ✅ handle signup
  const signup = async (name, email, password, passwordConfirm) => {
    const newUser = await signupService(name, email, password, passwordConfirm);
    setUser(newUser);
    return newUser;
  };

  // ✅ handle logout
  const logout = async () => {
    await api.get("/users/logout", { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
