package com.example.bookshop.dto.request;

import com.example.bookshop.entity.enums.OrderStatus;
import lombok.Data;

@Data
public class AdminUpdateStatusOrderDto {
    Long orderId;
    OrderStatus newStatus;
}
