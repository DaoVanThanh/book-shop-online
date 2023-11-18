package com.example.bookshop.service.impl;

import com.example.bookshop.dto.BookReview;
import com.example.bookshop.dto.request.*;
import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.response.GetUserReviewResponse;
import com.example.bookshop.entity.Book;
import com.example.bookshop.entity.Review;
import com.example.bookshop.entity.User;
import com.example.bookshop.exception.ConflictDataException;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.*;
import com.example.bookshop.service.BookService;
import com.example.bookshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final UserService userService;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final ReviewRepository reviewRepository;

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

    public void changeBooksFromWarehouse(ArrayList<BookQuantity> bookQuantities) {
        for (BookQuantity bookQuantity : bookQuantities) {
            bookRepository.changeBooks(bookQuantity.getBookId(), bookQuantity.getQuantity());
        }
    }

    public GetBookDetailResponse getBookDetail(Long bookId) throws ResponseStatusException {
        Book book = bookRepository
                .findById(bookId)
                .orElseThrow(() -> new ParamInvalidException("Book Id không hợp lệ"));
        GetBookDetailResponse response = new GetBookDetailResponse();
        response.mapping(book);
        response.setAuthors(authorRepository.getListAuthorByBookId(bookId));
        response.setGenres(genreRepository.getListGenreByBookId(bookId));
        return response;
    }

    public ArrayList<GetBookDetailResponse> getBookDetails(ArrayList<Long> bookIds) throws ResponseStatusException {
        ArrayList<GetBookDetailResponse> result = new ArrayList<>();
        for (Long bookId : bookIds) {
            result.add(getBookDetail(bookId));
        }
        return result;
    }

    public void reviewBook(ReviewBookRequest request) throws ResponseStatusException {
        if (request.getPoint() < 1 || request.getPoint() > 5) {
            throw new ParamInvalidException("Point");
        }
        User user = userService.getUser();

        Book book = bookRepository
                .findById(request.getBookId())
                .orElseThrow(() -> new ParamInvalidException("Sách không tồn tại"));
        Review review = Review
                .builder()
                .book(book)
                .user(user)
                .point(request.getPoint())
                .review(request.getReview())
                .reviewDate(new Date())
                .build();

        try {
            reviewRepository.save(review);
        } catch (Exception e) {
            throw new ConflictDataException("Sách đã được review");
        }
    }

    public GetUserReviewResponse getUserReview(GetUserReviewRequest request) throws  ResponseStatusException {
        User user = userService.getUser();
        ArrayList<Review> reviews;
        if (request.getBookIds().isEmpty()) {
            reviews = reviewRepository.findAllByUser(user);
        } else {
            reviews = reviewRepository.getReviewsByUserAndBookBookIdIn(user, request.getBookIds());
        }
        return GetUserReviewResponse.builder()
                .bookReviews(BookReview.mappingFromReviews(reviews))
                .build();
    }

    private void ValidatePageSize(Integer page, Integer size) throws ResponseStatusException {
        if(page < 0) {
            throw new ParamInvalidException("Page không hợp lệ");
        }
        if(size <= 0) {
            throw new ParamInvalidException("Size không hợp lệ");
        }
    }

    public Page<Book> getListBookByGenre(Long genreId, Integer page, Integer size) throws ResponseStatusException {
        ValidatePageSize(page, size);
        if(!genreRepository.existsByGenreId(genreId)) {
            throw new ParamInvalidException("GenreId không tồn tại");
        }
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository
                .findAllByGenreId(
                        genreId,
                        pageable
                );
    }

    public Page<Book> getListBookByPrice(Long minPrice, Long maxPrice, Integer page, Integer size) throws ResponseStatusException {
        ValidatePageSize(page, size);
        if(minPrice > maxPrice) {
            throw new ParamInvalidException("Khoảng giá trị price không hợp lệ");
        }
        if(minPrice < 0) {
            throw new ParamInvalidException("minPrice không được < 0");
        }
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository
                .findAllByPriceRange(
                        minPrice,
                        maxPrice,
                        pageable
                );
    }

    public Page<Book> getListBookBySearch(String key, Integer page, Integer size) throws ResponseStatusException {
        ValidatePageSize(page, size);
        if(key == null || key.isEmpty()) {
            throw new ParamInvalidException("key không hợp lệ");
        }
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository
                .findAllBySearchTitle(
                        key,
                        pageable
                );
    }

    public Page<Book> getAllBook(Integer page, Integer size) throws ResponseStatusException {
        ValidatePageSize(page, size);
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository
                .findAll(
                        pageable
                );
    }
}