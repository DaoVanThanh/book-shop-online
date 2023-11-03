package com.example.bookshop.service.impl;

<<<<<<< HEAD
import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.entity.Book;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
=======
import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.entity.Book;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
>>>>>>> master

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
<<<<<<< HEAD
    public GetBookDetailResponse getBookDetail(Long bookId) throws NotFoundException {
        Book book = bookRepository
                .findByBookId(bookId)
                .orElseThrow(() -> new NotFoundException());
        GetBookDetailResponse bookResponse = new GetBookDetailResponse();
        bookResponse.mapping(book);
        return bookResponse;
=======
    public Boolean checkBookQuantity(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException {
        for (BookQuantity bookQuantity : bookQuantities) {
            Book book = bookRepository
                    .findById(bookQuantity.getBookId())
                    .orElseThrow(() -> new ParamInvalidException("Sách không tồn tại trong kho"));
            if (bookQuantity.getQuantity() > book.getStockQuantity()) {
                return false;
            }
        }
        return true;
    }

    public Long calcCost(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException {
        Long res = 0L;
        for (BookQuantity bookQuantity : bookQuantities) {
            Book book = bookRepository
                    .findById(bookQuantity.getBookId())
                    .orElseThrow(() -> new ParamInvalidException("Sách không tồn tại trong kho"));
            res += book.getPrice() * bookQuantity.getQuantity();
        }
        return res;
    }

    public void removeBooksFromWarehouse(ArrayList<BookQuantity> bookQuantities) {
        for (BookQuantity bookQuantity : bookQuantities) {
            bookRepository.removeBooks(bookQuantity.getBookId(), bookQuantity.getQuantity());
        }
>>>>>>> master
    }
}
