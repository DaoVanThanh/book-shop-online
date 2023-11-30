package com.example.bookshop.adminService.implementation;

import com.example.bookshop.adminService.AdminAuthorService;
import com.example.bookshop.adminService.AdminBookService;
import com.example.bookshop.adminService.AdminGenreService;
import com.example.bookshop.dto.request.AddBookRequest;
import com.example.bookshop.dto.request.UpdateBookRequest;
import com.example.bookshop.dto.response.GetBookStatisticResponse;
import com.example.bookshop.entity.*;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AdminBookServiceImpl implements AdminBookService {
    private final BookRepository bookRepository;
    private final AdminAuthorService adminAuthorService;
    private final AdminGenreService adminGenreService;

    @Transactional
    public void createNewBook(AddBookRequest request) throws ResponseStatusException {
        if(request == null) {
            throw new ParamInvalidException("Request rỗng");
        }
        if(bookRepository.existsByTitle(request.getTitle())) {
            throw new ParamInvalidException("Tên sách đã tồn tại");
        }
        if(request.getAuthor_names().isEmpty()) {
            throw new ParamInvalidException("Danh sách tên tác giả không được để trống");
        }
        if(request.getGenre_names().isEmpty()) {
            throw new ParamInvalidException("Danh sách tên thể loại không được để trống");
        }

        Book book = request.mappingToBook();
        for(String author_name : request.getAuthor_names()) {
            book.getAuthors().add(adminAuthorService.createNewAuthor(author_name));
        }
        for(String genre_name : request.getGenre_names()) {
            book.getGenres().add(adminGenreService.createNewGenre(genre_name));
        }
        bookRepository.save(book);
    }

    private ArrayList<String> processString(ArrayList<String> strings) {
        ArrayList<String> trimmedList = new ArrayList<>();
        for(String str : strings) {
            trimmedList.add(str.trim());
        }
        HashSet<String> uniqueSet = new HashSet<>(trimmedList);
        return new ArrayList<>(uniqueSet);
    }

    @Transactional
    public void updateBook(UpdateBookRequest request) throws ResponseStatusException {
        Book book = bookRepository
                .findById(
                         request.getBookId()
                )
                .orElseThrow(() -> new ParamInvalidException("Book id không tồn tại"));

        if(request.getPrice() < 0) {
            throw new ParamInvalidException("Price không được < 0");
        }
        if(request.getStockQuantity() < 0) {
            throw new ParamInvalidException("Stock quantity không được < 0");
        }

        if(!book.getTitle().equals(request.getTitle()) && bookRepository.existsByTitle(request.getTitle())) {
            throw new ParamInvalidException("Tên sách đã tồn tại");
        }

        if(request.getAuthor_names().isEmpty()) {
            throw new ParamInvalidException("Danh sách tên tác giả không được để trống");
        }
        if(request.getGenre_names().isEmpty()) {
            throw new ParamInvalidException("Danh sách tên thể loại không được để trống");
        }

        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setPrice(request.getPrice());
        book.setPublication_date(request.getPublication_date());
        book.setStockQuantity(request.getStockQuantity());
        book.setImgUrl(request.getImgUrl());
        book.getAuthors().clear();
        book.getGenres().clear();

        bookRepository.deleteBookAuthorByBookId(book.getBookId());
        bookRepository.deleteBookGenreByBookId(book.getBookId());


        for(String author_name : processString(request.getAuthor_names())) {
            Long authorId = adminAuthorService.createNewAuthor(author_name).getAuthorId();
            bookRepository.addBookAuthor(book.getBookId(), authorId);
        }
        for(String genre_name : processString(request.getGenre_names())) {
            Long genreId = adminGenreService.createNewGenre(genre_name).getGenreId();
            bookRepository.addBookGenre(book.getBookId(), genreId);
        }

        bookRepository.save(book);
    }

    public Page<GetBookStatisticResponse> getBookStatistic(Integer page, Integer size, Date startDate, Date endDate) {
        if(page < 0) {
            throw new ParamInvalidException("Page không hợp lệ");
        }
        if(size <= 0) {
            throw new ParamInvalidException("Size không hợp lệ");
        }
        if(startDate.after(endDate)) {
            throw new ParamInvalidException("Start Date và End Date không hợp lệ");
        }

        Pageable pageable = PageRequest.of(page, size);
        return bookRepository
                .getBookStatistic(
                        pageable,
                        startDate,
                        endDate
                );
    }

}
