package com.example.bookshop.adminController;

import com.example.bookshop.adminService.AdminOrderManagementService;
import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.enums.OrderStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/orm")
public class AdminOrderManagementController {

    private final AdminOrderManagementService adminOrderManagementService;

    public AdminOrderManagementController(AdminOrderManagementService adminOrderManagementService) {
        this.adminOrderManagementService = adminOrderManagementService;
    }

    // API lấy thông tin chi tiết về tất cả các đơn hàng
    @GetMapping("/all-orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = adminOrderManagementService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // API lấy thông tin chi tiết về một đơn hàng dựa trên ID
    @GetMapping("/order/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return adminOrderManagementService.getOrderById(orderId);
    }

    // API lấy thông tin về các đơn hàng theo status
    @GetMapping("/orders-by-status")
    public ResponseEntity<List<Order>> getOrdersByStatus(@RequestParam OrderStatus status) {
        Optional<List<Order>> orders = adminOrderManagementService.getOrdersByStatus(status);

        if (orders.isPresent()) {
            return ResponseEntity.ok(orders.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // API cập nhật trạng thái của một đơn hàng dựa trên ID
    @PutMapping("/update-status/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatus newStatus) {
        adminOrderManagementService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok("Order status updated successfully");
    }

    // API cập nhật trạng thái của nhiều đơn hàng cùng một lúc (batch update)
    @PutMapping("/update-status-batch")
    public ResponseEntity<String> updateOrderStatusBatch(@RequestBody List<Long> orderIds, @RequestBody OrderStatus newStatus) {
        adminOrderManagementService.updateOrderStatusBatch(orderIds, newStatus);
        return ResponseEntity.ok("Batch order status update completed");
    }
}