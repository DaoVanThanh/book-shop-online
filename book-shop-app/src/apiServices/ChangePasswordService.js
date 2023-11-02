import { instance } from "./CustomAxios";

const changePassword = async (oldPassword, newPassword) => {
    return await instance.post("/api/changePassword",oldPassword, newPassword);
};

export {changePassword}
