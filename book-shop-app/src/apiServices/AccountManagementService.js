import { instance } from "./CustomAxios";

const getUserInfo = async () => {
    return await instance.get("api/user/info");
};

const updateUser = async (userData) => {
    return await instance.post("api/user/update", userData);
};

export {getUserInfo, updateUser}