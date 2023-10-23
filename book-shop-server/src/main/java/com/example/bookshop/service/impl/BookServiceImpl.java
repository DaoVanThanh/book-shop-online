package com.example.bookshop.service.impl;

import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.entity.Book;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.BookRepository;
import com.example.bookshop.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
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
    }
}
