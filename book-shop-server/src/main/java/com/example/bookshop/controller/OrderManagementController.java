package com.example.bookshop.controller;

import com.example.bookshop.dto.request.*;
import com.example.bookshop.service.OrderManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/orm")
@RequiredArgsConstructor
public class OrderManagementController {
    private final OrderManagementService orderManagementService;

    @PutMapping("/carts/book")
    public ResponseEntity<?> updateCart(
            @RequestBody UpdateCartRequest request
    ) throws ResponseStatusException {
        orderManagementService.updateCart(request.getBookId(), request.getQuantity());
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

    @PutMapping("orders/update/status")
    public ResponseEntity<?> UpdateStatusOrder(
            @RequestBody UpdateStatusOrderRequest request
    ) throws ResponseStatusException {
        orderManagementService.updateStatusOrder(
                request.getOrderId(),
                request.getOrderStatus());
        return ResponseEntity.ok("Update status order successfully");
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
    public ResponseEntity<?> GetAllOrders() throws ResponseStatusException {
        return ResponseEntity.ok(orderManagementService.getAllOrders());
    }
}
