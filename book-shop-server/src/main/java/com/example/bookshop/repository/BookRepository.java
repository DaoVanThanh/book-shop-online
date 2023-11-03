package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
=======
import com.example.bookshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
>>>>>>> master
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

<<<<<<< HEAD
import java.util.Optional;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByBookId(Long bookId);
=======
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
>>>>>>> master
}
