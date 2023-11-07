package com.example.bookshop.adminService.implementation;

import com.example.bookshop.adminService.AdminOrderManagementService;
import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.enums.OrderStatus;
import com.example.bookshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminOrderManagementServiceImpl implements AdminOrderManagementService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<List<Order>> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(newStatus);
            orderRepository.save(order);
        }
    }

    public void updateOrderStatusBatch(List<Long> orderIds, OrderStatus newStatus) {
        List<Order> orders = orderRepository.findAllById(orderIds);
        for (Order order : orders) {
            order.setStatus(newStatus);
        }
        orderRepository.saveAll(orders);
    }
}
