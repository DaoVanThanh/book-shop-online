package com.example.bookshop.adminService.implementation;

import com.example.bookshop.adminService.AdminAuthorService;
import com.example.bookshop.adminService.AdminBookService;
import com.example.bookshop.adminService.AdminGenreService;
import com.example.bookshop.dto.request.AddBookRequest;
import com.example.bookshop.entity.*;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
}
