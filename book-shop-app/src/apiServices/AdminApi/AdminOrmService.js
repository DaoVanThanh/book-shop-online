import { instance } from "../CustomAxios";

const getAllOrders = async () => {
    return await instance.get("api/admin/orm/orders");
};
const updateStateOrder = async (newStatus) => {
    return await  instance.put("api/admin/orm/updateStatus",newStatus)
}

export {getAllOrders,updateStateOrder}