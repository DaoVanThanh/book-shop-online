package com.example.bookshop.controller;

import com.example.bookshop.dto.request.GetBookDetailRequest;
import com.example.bookshop.dto.request.GetListBookByGenreRequest;
import com.example.bookshop.dto.request.GetListBookByPriceRequest;
import com.example.bookshop.dto.request.GetListBookBySearchRequest;
import com.example.bookshop.dto.request.*;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/detail")
    public ResponseEntity<?> getBookDetail(
            @RequestBody GetBookDetailRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getBookDetail(request.getBookId()));
    }

    @GetMapping("/genre")
    public ResponseEntity<?> getListBookByGenre(
            @RequestBody GetListBookByGenreRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getListBookByGenre(request));
    }

    @PostMapping("/review")
    public ResponseEntity<?> reviewBook(
            @RequestBody ReviewBookRequest request
    ) throws ResponseStatusException {
        bookService.reviewBook(request);
        return ResponseEntity.ok("Review successfully!");
    }

    @GetMapping("/get/user/review")
    public ResponseEntity<?> getUserReview(
            @RequestBody GetUserReviewRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getUserReview(request));
    }

    @GetMapping("/price")
    public ResponseEntity<?> getListBookByPrice(
            @RequestBody GetListBookByPriceRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getListBookByPrice(request));
    }

    @GetMapping("/search")
    public ResponseEntity<?> getListBookBySearch(
            @RequestBody GetListBookBySearchRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getListBookBySearch(request));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBook(
            @RequestBody GetAllBookRequest request
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getAllBook(request));
    }
}
