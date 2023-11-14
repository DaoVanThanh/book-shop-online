package com.example.bookshop.adminService.implementation;

import com.example.bookshop.adminService.AdminAuthorService;
import com.example.bookshop.entity.Author;
import com.example.bookshop.entity.Genre;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AdminAuthorServiceImpl implements AdminAuthorService {
    private final AuthorRepository authorRepository;

    public Author createNewAuthor(String authorName) throws ResponseStatusException {
        if(authorName == null || authorName.isBlank()) {
            throw new ParamInvalidException("Author name không đuọc để trống");
        }
        authorName = authorName.trim();
        if(authorRepository.existsByAuthorName(authorName)) {
            return authorRepository
                    .findByAuthorName(
                            authorName
                    ).orElseThrow(() -> new ParamInvalidException("Author name không tồn tại"));
        } else {
            Author author = new Author();
            author.setAuthorName(authorName);
            return authorRepository.save(author);
        }

    }
}
