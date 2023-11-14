package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>  {
    @Override
    Optional<Book> findById(Long bookId);

    Boolean existsByTitle(String title);

    Optional<Book> findBookByTitle(String title);

    @Modifying
    @Query(
            value = "update books " +
                    "set stock_quantity = stock_quantity - :quantity " +
                    "where book_id = :book_id", nativeQuery = true)
    @Transactional
    void removeBooks(
            @Param("book_id") Long bookId,
            @Param("quantity") Integer quantity
    );

    ArrayList<Book> getBooksByBookIdIn(ArrayList<Long> ids);

    @Modifying
    @Query(
            value = "SELECT bg.book_id " +
                    "FROM book_genre bg " +
                    "WHERE bg.genre_id = :genre_id " +
                    "LIMIT :size OFFSET :offset",
            nativeQuery = true
    )
    @Transactional
    Optional<ArrayList<Long>> getListBookIdByGenreId(
            @Param("genre_id") Long genreId,
            @Param("size") Long size,
            @Param("offset") Long offset
    );

    @Modifying
    @Query(
            value = "SELECT b.book_id " +
                    "FROM books AS b " +
                    "WHERE b.price BETWEEN :min_Price AND :max_Price " +
                    "LIMIT :size OFFSET :offset",
            nativeQuery = true
    )
    @Transactional
    Optional<ArrayList<Long>> getListBookIdByPrice(
            @Param("min_Price") Long minPrice,
            @Param("max_Price") Long maxPrice,
            @Param("size") Long size,
            @Param("offset") Long offset
    );

    @Modifying
    @Query(
            value = "SELECT DISTINCT(b.book_id) " +
                    "FROM books AS b " +
                    "JOIN book_author AS ba ON b.book_id = ba.book_id " +
                    "JOIN authors AS a ON ba.author_id = a.author_id " +
                    "WHERE b.title COLLATE utf8mb4_unicode_520_ci LIKE CONCAT('%',:key,'%') " +
                    "OR a.author_name COLLATE utf8mb4_unicode_520_ci LIKE CONCAT('%', :key, '%') " +
                    "LIMIT :size OFFSET :offset",
            nativeQuery = true
    )
    @Transactional
    Optional<ArrayList<Long>> getListBookIdBySearch(
            @Param("key") String key,
            @Param("size") Long size,
            @Param("offset") Long offset
    );
}