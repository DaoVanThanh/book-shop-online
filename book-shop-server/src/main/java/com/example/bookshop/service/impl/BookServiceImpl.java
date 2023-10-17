package com.example.bookshop.service.impl;

import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.entity.Book;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    public GetBookDetailResponse getBookDetail(Long bookId) throws NotFoundException {
        Book book = bookRepository
                .findByBookId(bookId)
                .orElseThrow(() -> new NotFoundException());
        GetBookDetailResponse bookResponse = new GetBookDetailResponse();
        bookResponse.mapping(book);
        return bookResponse;
    }
}
