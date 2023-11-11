package com.example.bookshop.dto.request;

import com.example.bookshop.dto.BookQuantity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetOrderCostRequest {
    private ArrayList<BookQuantity> bookQuantities;
}
