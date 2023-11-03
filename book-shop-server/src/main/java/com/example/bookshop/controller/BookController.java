package com.example.bookshop.controller;

import com.example.bookshop.dto.request.GetBookDetailRequest;
import com.example.bookshop.dto.request.GetListBookByGenreRequest;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

    /*
    @GetMapping("/search/{name}")
    public List<Book> getListBookSearch(@PathVariable String name) {
        return null;
    }
    */
}
