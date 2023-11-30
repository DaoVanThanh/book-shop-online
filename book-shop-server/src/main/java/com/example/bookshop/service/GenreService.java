package com.example.bookshop.service;

import com.example.bookshop.entity.Genre;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public interface GenreService {
    List<Genre> getListGenre() throws ResponseStatusException;
}
