package com.example.bookshop.controller;

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

    @GetMapping("/detail/{bookId}")
    public ResponseEntity<?> getBookDetail(
            @PathVariable Long bookId
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getBookDetail(bookId));
    }

    @GetMapping("/genre/{genreId}")
    public ResponseEntity<?> getListBookByGenre(
            @PathVariable Long genreId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getListBookByGenre(genreId, page, size));
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
            @RequestParam(value = "min_price", defaultValue = "0") Long minPrice,
            @RequestParam(value = "max_price", defaultValue = "1000000000") Long maxPrice,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getListBookByPrice(minPrice, maxPrice, page, size));
    }

    @GetMapping("/search")
    public ResponseEntity<?> getListBookBySearch(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getListBookBySearch(key, page, size));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBook(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getAllBook(page, size));
    }

    @GetMapping("/bestSeller")
    public  ResponseEntity<?> getAllByBestSeller(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getAllByBestSeller(page, size));
    }

    @GetMapping("/famousAuthor")
    ResponseEntity<?> getFamousAuthor(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size
    ) throws ResponseStatusException {
        return ResponseEntity.ok(bookService.getFamousAuthor(page, size));
    }
}
