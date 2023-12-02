import { instance } from "./CustomAxios";

const getUserInfo = async () => {
    return await instance.get("/api/user/info");
};


export {getUserInfo}