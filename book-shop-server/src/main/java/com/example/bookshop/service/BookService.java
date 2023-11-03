package com.example.bookshop.service;

import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.response.GetBookDetailResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
public interface BookService {
    Boolean checkBookQuantity(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    Long calcCost(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    void removeBooksFromWarehouse(ArrayList<BookQuantity> bookQuantities);

    GetBookDetailResponse getBookDetail (long bookId) throws ResponseStatusException;
}