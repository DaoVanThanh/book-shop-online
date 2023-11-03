package com.example.bookshop.dto.response;

import com.example.bookshop.entity.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStatusOrderResponse {
    private OrderStatus status;
}
