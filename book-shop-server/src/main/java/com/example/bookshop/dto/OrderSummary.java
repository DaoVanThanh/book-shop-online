package com.example.bookshop.dto;

import com.example.bookshop.entity.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummary {
    private Long orderId;
    private String deliveryAddress;
    private Date orderDate;
    private OrderStatus status;
    private Long totalAmount;
    ArrayList<BookQuantitySummary> bookQuantitySummaries;
}
