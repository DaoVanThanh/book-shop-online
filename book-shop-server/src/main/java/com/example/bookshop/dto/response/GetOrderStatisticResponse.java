package com.example.bookshop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetOrderStatisticResponse {
    private Long numberOfOrder;

    private Long revenue;

    private Long numberOfBook;
}
