package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(
            value = "select b from Book as b where b.bookId = :bookId"
    )
    Optional<Book> findByBookId(
            @Param("bookId") Long bookId
    );

}
