package com.example.bookshop.adminService;


import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.enums.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface AdminOrderManagementService {

    Order getOrderById(Long orderId);

    List<Order> getAllOrders();
    Optional<List<Order>> getOrdersByStatus(OrderStatus status);
    void updateOrderStatusBatch(List<Long> orderIds, OrderStatus newStatus);

    void updateOrderStatus(Long orderId, OrderStatus newStatus);
}
