import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  withCredentials: true,
});

export { instance };
