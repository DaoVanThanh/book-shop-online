package com.example.bookshop.repository;

import com.example.bookshop.dto.response.GetBookStatisticResponse;
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
import java.util.Date;
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

    @Query(
            value = "SELECT b.* " +
                    "FROM books AS b " +
                    "LEFT JOIN order_details AS od on od.book_id = b.book_id " +
                    "GROUP BY b.book_id " +
                    "ORDER BY COALESCE(SUM(od.quantity), 0) DESC",
            countQuery = "SELECT COUNT(b.book_id) " +
                    "FROM books AS b",
            nativeQuery = true
    )
    Page<Book> findAllByBestSeller(
            Pageable pageable
    );

    @Query(
            value = "SELECT b.* " +
                    "FROM books AS b " +
                    "ORDER BY COALESCE(b.publication_date, 0) DESC",
            countQuery = "SELECT COUNT(b.book_id) " +
                    "FROM books AS b",
            nativeQuery = true
    )
    Page<Book> findByNewest(
            Pageable pageable
    );

    @Modifying
    @Query(
            value = "DELETE FROM book_author " +
                    "WHERE book_id = :book_id",
            nativeQuery = true
    )
    @Transactional
    void deleteBookAuthorByBookId(
            @Param("book_id") Long bookId
    );

    @Modifying
    @Query(
            value = "DELETE FROM book_genre " +
                    "WHERE book_id = :book_id",
            nativeQuery = true
    )
    @Transactional
    void deleteBookGenreByBookId(
            @Param("book_id") Long bookId
    );

    @Modifying
    @Query(
            value = "INSERT INTO book_author(book_id, author_id) " +
                    "value (:book_id, :author_id)",
            nativeQuery = true
    )
    @Transactional
    void addBookAuthor(
            @Param("book_id") Long bookId,
            @Param("author_id") Long authorId
    );

    @Modifying
    @Query(
            value = "INSERT INTO book_genre(book_id, genre_id) " +
                    "value (:book_id, :genre_id)",
            nativeQuery = true
    )
    @Transactional
    void addBookGenre(
            @Param("book_id") Long bookId,
            @Param("genre_id") Long genreId
    );

    @Query(
            value = "SELECT b.book_id AS bookId, " +
                        "b.title AS title, " +
                        "COALESCE(SUM(od.quantity), 0) AS totalSold, " +
                        "COALESCE(SUM(od.quantity * od.price), 0) AS revenue " +
                    "FROM books AS b " +
                    "JOIN ( " +
                        "SELECT book_id, quantity, price " +
                        "FROM order_details AS od " +
                        "LEFT JOIN orders AS o ON o.order_id = od.order_id " +
                        "WHERE o.order_date BETWEEN DATE(:start_date) AND DATE_SUB(DATE_ADD(:end_date, INTERVAL 1 DAY), INTERVAL 1 SECOND) " +
                        "AND o.status = 'SUCCESS' " +
                    ") AS od ON od.book_id = b.book_id " +
                    "GROUP BY b.book_id " +
                    "ORDER BY revenue DESC",
            nativeQuery = true
    )
    Page<GetBookStatisticResponse> getBookStatistic(
            Pageable pageable,
            @Param("start_date") Date startDate,
            @Param("end_date") Date endDate
    );
}