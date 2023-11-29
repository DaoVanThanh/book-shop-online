package com.example.bookshop.repository;

import com.example.bookshop.entity.Author;
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
public interface AuthorRepository extends JpaRepository<Author, Long>  {

    Boolean existsByAuthorName(String authorName);

    Optional<Author> findByAuthorName(String authorName);

    @Modifying
    @Query(
            value = "SELECT a.* " +
                    "FROM book_author ba " +
                    "join authors a on ba.author_id = a.author_id " +
                    "where ba.book_id = :book_id", nativeQuery = true)
    @Transactional
    ArrayList<Author> getListAuthorByBookId(
            @Param("book_id") Long bookId
    );

    @Query(
            value = "SELECT * " +
                    "FROM authors",
            nativeQuery = true
    )
    Page<Author> findAllByFamous(
            Pageable pageable
    );
}