import axios from "axios";

const baseURL = "http://localhost:8080/api/user";

export const getUserInfo = (config) => {
    return axios.get(`${baseURL}/info`,config);
};

export const updateUser = (userData,config) => {
    return axios.post(`${baseURL}/update`, userData,config);
};
