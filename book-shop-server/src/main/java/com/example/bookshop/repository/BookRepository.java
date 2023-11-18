package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Modifying
    @Query(
            value = "update books " +
                    "set stock_quantity = stock_quantity - :quantity " +
                    "where book_id = :book_id", nativeQuery = true)
    @Transactional
    void changeBooks(
            @Param("book_id") Long bookId,
            @Param("quantity") Integer quantity
    );

    ArrayList<Book> getBooksByBookIdIn(ArrayList<Long> ids);

    @Query(
            value = "SELECT b.* " +
                    "FROM book_genre AS bg " +
                    "JOIN books AS b ON b.book_id = bg.book_id " +
                    "WHERE bg.genre_id = :genre_id",
            countQuery = "SELECT COUNT(*) " +
                    "FROM book_genre AS bg " +
                    "JOIN books AS b ON b.book_id = bg.book_id " +
                    "WHERE bg.genre_id = :genre_id",
            nativeQuery = true
    )
    Page<Book> findAllByGenreId(
            @Param("genre_id") Long genreId,
            Pageable pageable
    );

    @Query(
            value = "SELECT * " +
                    "FROM books AS b " +
                    "WHERE b.price BETWEEN :min_price AND :max_price",
            nativeQuery = true
    )
    Page<Book> findAllByPriceRange(
            @Param("min_price") Long minPrice,
            @Param("max_price") Long maxPrice,
            Pageable pageable
    );

    @Query(
            value = "SELECT * " +
                    "FROM books AS b " +
                    "WHERE b.title COLLATE utf8mb4_unicode_520_ci LIKE CONCAT('%',:key,'%')",
            nativeQuery = true
    )
    Page<Book> findAllBySearchTitle(
            @Param("key") String key,
            Pageable pageable
    );
}