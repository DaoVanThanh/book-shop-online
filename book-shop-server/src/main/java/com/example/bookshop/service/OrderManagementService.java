package com.example.bookshop.service;

import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.request.GetOrderCostRequest;
import com.example.bookshop.dto.response.*;
import com.example.bookshop.entity.enums.OrderStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

public interface OrderManagementService {
    GetStatusOrderResponse getStatusOrder(Long orderId) throws ResponseStatusException;
    void updateCart(Long bookId, Integer quantity) throws ResponseStatusException;
    CreateOrderResponse createOrder(String deliveryAddress, ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    void cancelOrder(Long orderId) throws ResponseStatusException;
    GetAllBookPurchasedResponse getAllBookPurchased() throws ResponseStatusException;
    GetOrderCostResponse getOrderCost(GetOrderCostRequest request) throws ResponseStatusException;
    GetCartDetailResponse getCartDetail() throws ResponseStatusException;

    GetAllOrdersResponse getAllOrders() throws ResponseStatusException;
}
