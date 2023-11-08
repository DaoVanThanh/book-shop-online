package com.example.bookshop.service;

import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.request.GetOrderCostRequest;
import com.example.bookshop.dto.response.CreateOrderResponse;
import com.example.bookshop.dto.response.GetAllBookPurchasedResponse;
import com.example.bookshop.dto.response.GetOrderCostResponse;
import com.example.bookshop.dto.response.GetStatusOrderResponse;
import com.example.bookshop.entity.enums.OrderStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

public interface OrderManagementService {
    GetStatusOrderResponse getStatusOrder(Long orderId) throws ResponseStatusException;
    void updateCart(Long bookId, Integer quantity) throws ResponseStatusException;
    CreateOrderResponse createOrder(String deliveryAddress, ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    void updateStatusOrder(Long orderId, OrderStatus orderStatus) throws ResponseStatusException;
    GetAllBookPurchasedResponse getAllBookPurchased() throws ResponseStatusException;
    GetOrderCostResponse getOrderCost(GetOrderCostRequest request) throws ResponseStatusException;
}
