import api from "./api";

export async function login(email, password) {
  const res = await api.post("/users/login", { email, password });
  console.log(res);
  return res.data.data.user;
}

export async function signup(name, email, password, passwordConfirm) {
  const res = await api.post("/users/signup", {
    name,
    email,
    password,
    passwordConfirm,
  });
  console.log(res);
  return res.data.data.user;
}
