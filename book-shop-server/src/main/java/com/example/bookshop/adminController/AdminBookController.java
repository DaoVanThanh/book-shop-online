package com.example.bookshop.adminController;


import com.example.bookshop.adminService.AdminBookService;
import com.example.bookshop.dto.request.AddBookRequest;
import com.example.bookshop.dto.request.UpdateBookRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@RestController
@RequestMapping("/api/admin/book")
@RequiredArgsConstructor
public class AdminBookController {
    private final AdminBookService adminBookService;

    @PostMapping("/add")
    public ResponseEntity<?> addBook(
            @RequestBody AddBookRequest request
    ) throws ResponseStatusException {
        adminBookService.createNewBook(request);
        return ResponseEntity.ok("Thêm sách thành công");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBook(
            @RequestBody UpdateBookRequest request
    ) throws ResponseStatusException {
        adminBookService.updateBook(request);
        return ResponseEntity.ok("Cập nhật sách thành công");
    }

    @GetMapping("/statistic")
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
}
