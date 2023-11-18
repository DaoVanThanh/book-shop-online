package com.example.bookshop.adminController;

import com.example.bookshop.adminService.AdminOrderManagementService;
import com.example.bookshop.dto.request.AdminUpdateStatusOrderDto;
import com.example.bookshop.dto.response.AdminOrderManagementDto;
import com.example.bookshop.entity.enums.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orm")
public class AdminOrderManagementController {

    private  AdminOrderManagementService adminOrderManagementService;

    @Autowired
    public void OrderManagementController(AdminOrderManagementService adminOrderManagementService) {
        this.adminOrderManagementService = adminOrderManagementService;
    }

    public AdminOrderManagementController(AdminOrderManagementService adminOrderManagementService) {
        this.adminOrderManagementService = adminOrderManagementService;
    }
    @GetMapping("/test")
    public String test() {
        return "hello";
    }

    // API lấy thông tin chi tiết về tất cả các đơn hàng
    @GetMapping("/orders")
    public ResponseEntity<List<AdminOrderManagementDto>> getAllOrders() {
        List<AdminOrderManagementDto> orderDTOs = adminOrderManagementService.getAllOrders();
        return ResponseEntity.ok(orderDTOs);
    }

    // API lấy thông tin chi tiết về một đơn hàng dựa trên ID
    @GetMapping("/order/{orderId}")
    public AdminOrderManagementDto getOrderById(@PathVariable Long orderId) {
        return adminOrderManagementService.getOrderById(orderId);
    }


    // API cập nhật trạng thái của một đơn hàng dựa trên ID
    @PutMapping("/updateStatus")
    public ResponseEntity<String> updateOrderStatus(@RequestBody AdminUpdateStatusOrderDto adminUpdateStatusOrderDto) {
        adminOrderManagementService.updateOrderStatus(adminUpdateStatusOrderDto);
        return ResponseEntity.ok("Order status updated successfully");
    }

}