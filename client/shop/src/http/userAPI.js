import { $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (values) => {
  const { data } = await $host.post("/api/user/registration", values);
  localStorage.setItem("token", data.accessToken);
  return jwt_decode(data.accessToken);
};

export const login = async (values) => {
  const { data } = await $host.post("/api/user/login", values);
  localStorage.setItem("token", data.accessToken);
  return jwt_decode(data.accessToken);
};

export const check = async () => {
  const { data } = await $host.get("/api/user/refresh");
  localStorage.setItem("token", data.accessToken);
  return jwt_decode(data.accessToken);
};

export const logout = async () => {
  return $host.post("/api/user/logout");
};
