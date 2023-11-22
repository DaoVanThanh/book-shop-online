package com.example.bookshop.adminController;


import com.example.bookshop.adminService.AdminBookService;
import com.example.bookshop.dto.request.AddBookRequest;
import com.example.bookshop.dto.request.UpdateBookRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
}
