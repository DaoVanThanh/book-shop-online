package com.example.bookshop.adminController;

import com.example.bookshop.adminService.AdminBookService;
import com.example.bookshop.adminService.AdminOrderManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@RestController
@RequestMapping("/api/admin/statistic")
@RequiredArgsConstructor
public class AdminStatisticController {
    private final AdminBookService adminBookService;
    private final AdminOrderManagementService adminOrderManagementService;

    @GetMapping("/book")
    public ResponseEntity<?> getBookStatistic(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size,
            @RequestParam(value = "start_date", defaultValue = "1900-01-01")
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(value = "end_date", defaultValue = "2100-01-01")
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) throws ResponseStatusException {
        return ResponseEntity.ok(adminBookService.getBookStatistic(page, size, startDate, endDate));
    }

    @GetMapping("/order")
    public ResponseEntity<?> getOrderStatistic(
            @RequestParam(value = "start_date", defaultValue = "1900-01-01")
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(value = "end_date", defaultValue = "2100-01-01")
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) throws ResponseStatusException {
        return ResponseEntity.ok(adminOrderManagementService.getOrderStatistic(startDate, endDate));
    }
}
