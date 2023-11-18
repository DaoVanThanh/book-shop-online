import { instance } from "./CustomAxios";

const getOrder = async () => {
    return await instance.get("api/orm/orders");
};


export {getOrder}