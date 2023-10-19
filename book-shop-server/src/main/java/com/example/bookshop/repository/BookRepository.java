package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByBookId(Long bookId);
}
