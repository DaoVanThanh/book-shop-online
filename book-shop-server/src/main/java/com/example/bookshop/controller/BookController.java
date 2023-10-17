package com.example.bookshop.controller;

import com.example.bookshop.dto.request.GetBookDetailRequest;
import com.example.bookshop.dto.request.GetListBookByGenreRequest;
import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.entity.Book;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/detail")
    public ResponseEntity<?> getBookDetail(
            @RequestBody GetBookDetailRequest request
    ) {
        try {
            return ResponseEntity.ok(bookService.getBookDetail(request.getBookId()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("book id not found");
        }
    }
    /*
    @GetMapping("genre")
    public ResponseEntity<?> getListBookGenre(
            GetListBookByGenreRequest request
    ) {
        try {
            return ResponseEntity.ok(bookService.get)
        }
    }


    @GetMapping("/search/{name}")
    public List<Book> getListBookSearch(@PathVariable String name) {
        return null;
    }
    */
}
