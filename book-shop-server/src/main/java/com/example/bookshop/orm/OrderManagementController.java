package com.example.bookshop.orm;

import com.example.bookshop.orm.request.GetStatusOrderRequest;
import com.example.bookshop.orm.request.UpdateCartRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orm")
@RequiredArgsConstructor
public class OrderManagementController {
    private final OrderManagementService orderManagementService;

    @PutMapping("/carts/book")
    public ResponseEntity<?> updateCart(
            @RequestBody UpdateCartRequest request
    ) {
        try {
            orderManagementService.updateCart(request.getBookId(), request.getQuantity());
            return ResponseEntity.ok("update cart successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/orders/status")
    public ResponseEntity<?> getStatusOrder(
            GetStatusOrderRequest request
    ) {
        try {
            return ResponseEntity.ok(orderManagementService.getStatusOrder(request.getOrderId()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("order id not found");
        }
    }
}
