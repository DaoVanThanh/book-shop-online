package com.example.bookshop.dto.request;

import com.example.bookshop.entity.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStatusOrderRequest {
    private Long orderId;
    private OrderStatus orderStatus;
}
