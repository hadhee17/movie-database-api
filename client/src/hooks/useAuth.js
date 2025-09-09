import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  function loginUser(data) {
    setUser(data);
  }

  function logoutUser() {
    setUser(null);
  }

  return { user, loginUser, logoutUser };
}
