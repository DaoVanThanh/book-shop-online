package com.example.bookshop.service;

import com.example.bookshop.dto.response.GetStatusOrderResponse;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

public interface OrderManagementService {
    GetStatusOrderResponse getStatusOrder(Long orderId) throws NotFoundException;
    void updateCart(Long bookId, Integer quantity) throws Exception;
}
