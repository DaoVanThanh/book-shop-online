package com.example.bookshop.service;

import com.example.bookshop.dto.request.*;
import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.response.GetUserReviewResponse;
import com.example.bookshop.entity.Author;
import com.example.bookshop.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
public interface BookService {
    Boolean checkBookQuantity(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    Long calcCost(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    void changeBooksFromWarehouse(ArrayList<BookQuantity> bookQuantities);

    GetBookDetailResponse getBookDetail (Long bookId) throws ResponseStatusException;

    ArrayList<GetBookDetailResponse> getBookDetails(ArrayList<Long> bookIds) throws ResponseStatusException;

    void reviewBook(ReviewBookRequest request) throws ResponseStatusException;

    GetUserReviewResponse getUserReview(GetUserReviewRequest request) throws  ResponseStatusException;
    Page<Book> getListBookByGenre(Long genreId, Integer page, Integer size) throws ResponseStatusException;

    Page<Book> getListBookByPrice(Long minPrice, Long maxPrice, Integer page, Integer size, String sort) throws ResponseStatusException;

    Page<Book> getListBookBySearch(String key, Integer page, Integer size) throws ResponseStatusException;

    Page<Book> getAllBook(Integer page, Integer size) throws ResponseStatusException;

    Page<Book> getAllByBestSeller(Integer page, Integer size) throws ResponseStatusException;

    Page<Book> getNewest(Integer page, Integer size) throws ResponseStatusException;

    Page<Author> getFamousAuthor(Integer page, Integer size) throws ResponseStatusException;
}