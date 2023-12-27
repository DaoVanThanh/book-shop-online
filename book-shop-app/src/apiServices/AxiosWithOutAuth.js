import axios from "axios";

const instanceNotAuth = axios.create({
    baseURL: "http://fall2324w3g8.int3306.freeddns.org",
});

// Add a request interceptor
instanceNotAuth.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instanceNotAuth.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export { instanceNotAuth };
