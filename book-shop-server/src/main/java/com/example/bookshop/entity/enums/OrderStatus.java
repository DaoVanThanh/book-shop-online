package com.example.bookshop.entity.enums;
public enum OrderStatus {
    PENDING,   // Trạng thái khởi tạo của đơn hàng ( chưa được xử lí)
    ACCEPTED, // Đơn hàng đã được chấp nhận đang chuyển đến bên giao hàng
    DELIVERING,  // đơn đang được vận chuyển
    SUCCESS,   // giao hàng thành công
    RETURNED, // khác bom đơn bên giao hàng hoàn lại
    CANCELLED // khách hàng hủy đơn (chỉ thực hiện trước khi accepted)
}
