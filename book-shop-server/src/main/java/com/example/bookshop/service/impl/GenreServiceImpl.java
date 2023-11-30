package com.example.bookshop.service.impl;

import com.example.bookshop.entity.Genre;
import com.example.bookshop.repository.GenreRepository;
import com.example.bookshop.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;

    public List<Genre> getListGenre() throws ResponseStatusException {
        return genreRepository.findAll();
    }

}
