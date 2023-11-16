import { instance } from "./CustomAxios";
import axios from "axios";

const getAllOrders = async () => {
    try {
        // Gửi yêu cầu GET đến API endpoint "/orders"
        const response = await axios.get('http://api/admin/orm/orders');

        // Lấy dữ liệu từ phản hồi
        const orderData = response.data;

        // Xử lý dữ liệu nếu cần thiết
        console.log(orderData);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching orders:', error);
    }
};

export {getAllOrders}