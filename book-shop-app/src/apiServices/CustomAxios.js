import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  if (error.response.status === 403) {
    localStorage.clear();
    window.location.href = "/login";
  }
  return Promise.reject(error);
});

export { instance };
