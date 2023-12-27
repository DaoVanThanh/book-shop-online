import axios from "axios";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: "http://fall2324w3g8.int3306.freeddns.org",
});

instance.interceptors.request.use(function (config) {
  if(localStorage.getItem("accessToken")) {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token)
    const expDate = new Date(decoded.exp * 1000)
    if(expDate < Date.now()) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  // if (error.response.status !== 200) {
  //   localStorage.clear();
  //   window.location.href = "/login";
  // }
  return Promise.reject(error);
});

export { instance };
