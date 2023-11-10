package com.example.bookshop.adminService;


import com.example.bookshop.dto.request.AdminUpdateStatusOrderDto;
import com.example.bookshop.dto.response.AdminOrderManagementDto;

import java.util.List;


public interface AdminOrderManagementService {

    AdminOrderManagementDto getOrderById(Long orderId);
    List<AdminOrderManagementDto> getAllOrders();

    void updateOrderStatus(AdminUpdateStatusOrderDto adminUpdateStatusOrderDto);
}
