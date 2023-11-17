package com.example.bookshop.service;

import com.example.bookshop.dto.request.*;
import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.response.GetListBookResponse;
import com.example.bookshop.dto.response.GetUserReviewResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public interface BookService {
    Boolean checkBookQuantity(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    Long calcCost(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    void removeBooksFromWarehouse(ArrayList<BookQuantity> bookQuantities);

    GetBookDetailResponse getBookDetail (Long bookId) throws ResponseStatusException;

    ArrayList<GetBookDetailResponse> getBookDetails(ArrayList<Long> bookIds) throws ResponseStatusException;

    void reviewBook(ReviewBookRequest request) throws ResponseStatusException;

    GetUserReviewResponse getUserReview(GetUserReviewRequest request) throws  ResponseStatusException;
    GetListBookResponse getListBookByGenre(Long genreId, Long page, Long size) throws ResponseStatusException;

    GetListBookResponse getListBookByPrice(Long minPrice, Long maxPrice, Long page, Long size) throws ResponseStatusException;

    GetListBookResponse getListBookBySearch(String key, Long page, Long size) throws ResponseStatusException;

    GetListBookResponse getAllBook(Long page, Long size) throws ResponseStatusException;
}