import api from "./api";

export async function login(email, password) {
  const res = await api.post("/users/login", { email, password });
  return res.data;
}

export async function signup(name, email, password) {
  const res = await api.post("/users/signup", { name, email, password });
  return res.data;
}
