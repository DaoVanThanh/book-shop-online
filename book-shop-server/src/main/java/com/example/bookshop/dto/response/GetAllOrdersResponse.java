package com.example.bookshop.dto.response;

import com.example.bookshop.dto.OrderSummary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAllOrdersResponse {
    ArrayList<OrderSummary> orderSummaries;
}
