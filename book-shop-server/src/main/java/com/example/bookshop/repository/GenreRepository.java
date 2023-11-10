package com.example.bookshop.repository;

import com.example.bookshop.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

//    @Modifying
//    @Query(
//            value = "SELECT COUNT(*) > 0 " +
//            "FROM genres AS g " +
//            "WHERE g.genre_id = :genre_id", nativeQuery = true)
//    @Transactional
//    Boolean existsGenreByGenreId(
//            @Param("genre_id") Long genreId
//    );

    Boolean existsGenreByGenreId(Long genreId);

    @Modifying
    @Query(
            value = "SELECT g.* " +
                    "FROM book_genre bg " +
                    "join genres g on bg.genre_id = g.genre_id " +
                    "where bg.book_id = :book_id", nativeQuery = true)
    @Transactional
    ArrayList<Genre> getListGenreByBookId(
            @Param("book_id") Long bookId
    );
}
