package com.example.bookshop.adminService.implementation;

import com.example.bookshop.adminService.AdminGenreService;
import com.example.bookshop.entity.Genre;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AdminGenreServiceImpl implements AdminGenreService {
    private final GenreRepository genreRepository;

    public Genre createNewGenre(String genreName) throws ResponseStatusException {
        if(genreName == null || genreName.isBlank()) {
            throw new ParamInvalidException("Genre name không được để trống");
        }
        genreName = genreName.trim();
        if(genreRepository.existsByGenreName(genreName)) {
            return genreRepository.
                    findByGenreName(
                            genreName
                    ).orElseThrow(() -> new ParamInvalidException("Genre name không tồn tại"));
        } else {
            Genre genre = new Genre();
            genre.setGenreName(genreName);
            return genreRepository.save(genre);
        }
    }

}
