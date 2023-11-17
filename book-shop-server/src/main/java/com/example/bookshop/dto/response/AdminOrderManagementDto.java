package com.example.bookshop.dto.response;

import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.enums.OrderStatus;
import lombok.Data;

import java.util.Date;

@Data
public class AdminOrderManagementDto {
    Long orderId;
    Date orderDate;
    OrderStatus status;
    Long totalAmount;
    String deliveryAddress;
    String phoneNumber;
    String fullName;
    String userName;

    public AdminOrderManagementDto(Order order) {
        this.orderId = order.getOrderId();
        this.orderDate = order.getOrderDate();
        this.status = order.getStatus();
        this.deliveryAddress = order.getDeliveryAddress();
        this.totalAmount = order.getTotalAmount();
        this.fullName = order.getUser().getFullName();
        this.phoneNumber = order.getUser().getPhoneNumber();
        this.userName = order.getUser().getUsername();
    }
}
