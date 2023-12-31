package com.example.bookshop.controller;

import com.example.bookshop.dto.request.*;
import com.example.bookshop.service.OrderManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/user/orm")
@RequiredArgsConstructor
public class OrderManagementController {
    private final OrderManagementService orderManagementService;

    @PutMapping("/carts/book")
    public ResponseEntity<?> updateCart(
            @RequestBody UpdateCartRequest request
    ) throws ResponseStatusException {
        orderManagementService.updateCart(request.getBookId(), request.getQuantity(), request.getIsAdded());
        return ResponseEntity.ok("update cart successfully!");
    }
    @GetMapping("/orders/status")
    public ResponseEntity<?> getStatusOrder(
            GetStatusOrderRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(orderManagementService.getStatusOrder(request.getOrderId()));
    }

    @PostMapping("/orders/create")
    public ResponseEntity<?> CreateOrder(
            @RequestBody CreateOrderRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(
                orderManagementService
                        .createOrder(
                                request.getDeliveryAddress(),
                                request.getBookQuantities()));
    }

    @PutMapping("/order/cancel")
    public ResponseEntity<?> CancelOrder(
            CancelOrderRequest request
    ) throws ResponseStatusException {
        orderManagementService.cancelOrder(request.getOrderId());
        return ResponseEntity.ok("Cancel order successfully");
    }

    @GetMapping("book/purchased")
    public ResponseEntity<?> GetAllBookPurchased() throws ResponseStatusException {
        return ResponseEntity.ok(orderManagementService.getAllBookPurchased());
    }

    @GetMapping("orders/cost")
    public ResponseEntity<?> GetOrdersCost(
            @RequestBody GetOrderCostRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(orderManagementService.getOrderCost(request));
    }

    @GetMapping("cartdetail")
    public ResponseEntity<?> GetCartDetail() throws ResponseStatusException {
        return ResponseEntity.ok(orderManagementService.getCartDetail());
    }

    @GetMapping("orders")
    public ResponseEntity<?> GetAllOrders(
            @RequestParam(value = "ids", defaultValue = "") ArrayList<Long> ids
    ) throws ResponseStatusException {
        return ResponseEntity.ok(orderManagementService.getAllOrders(ids));
    }
}
