package com.example.bookshop.adminService;

import com.example.bookshop.entity.Genre;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public interface AdminGenreService {
    public Genre createNewGenre(String genreName) throws ResponseStatusException;
}
