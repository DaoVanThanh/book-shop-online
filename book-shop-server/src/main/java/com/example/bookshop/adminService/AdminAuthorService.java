package com.example.bookshop.adminService;

import com.example.bookshop.entity.Author;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public interface AdminAuthorService {
    public Author createNewAuthor(String authorName) throws ResponseStatusException;
}
