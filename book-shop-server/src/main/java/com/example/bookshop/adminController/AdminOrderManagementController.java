package com.example.bookshop.adminController;

import com.example.bookshop.adminService.AdminOrderManagementService;
import com.example.bookshop.dto.request.AdminUpdateStatusOrderDto;
import com.example.bookshop.dto.response.AdminOrderManagementDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
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

    @GetMapping("/statistic")
    public ResponseEntity<?> getOrderStatistic(
            @RequestParam(value = "start_date", defaultValue = "1900-01-01")
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(value = "end_date", defaultValue = "2100-01-01")
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) throws ResponseStatusException {
        return ResponseEntity.ok(adminOrderManagementService.getOrderStatistic(startDate, endDate));
    }

}