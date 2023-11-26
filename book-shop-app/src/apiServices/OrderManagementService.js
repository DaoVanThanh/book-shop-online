import { instance } from "./CustomAxios";

const getOrder = async () => {
    return await instance.get("api/user/orm/orders");
};

const cancelOrder = async (orderId) => {
    return await instance.put(`api/user/orm/order/cancel?orderId=${orderId}`);
};


export {getOrder, cancelOrder}