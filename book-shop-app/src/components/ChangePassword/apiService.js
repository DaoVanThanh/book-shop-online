import axios from "axios";

const baseURL = "http://localhost:8080/api/changePassword";

export const changePassword = ({ oldPassword, newPassword },config) => {
    return axios.post(`${baseURL}`, { oldPassword, newPassword }, config);
};
