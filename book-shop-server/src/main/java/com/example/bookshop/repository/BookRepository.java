package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
import com.example.bookshop.entity.Order;
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
            value = "SELECT * " +
                    "FROM books " +
                    "where book_id = :book_id",
            nativeQuery = true
    )
    @Transactional
    Optional<Book> getBookDetail(
            @Param("book_id") Long bookId
    );

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

}