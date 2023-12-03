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
            value = "SELECT a.* " +
                    "FROM authors a " +
                    "left join book_author ba on a.author_id = ba.author_id " +
                    "left join order_details od on ba.book_id = od.book_id " +
                    "group by a.author_id " +
                    "order by coalesce(SUM(od.quantity), 0) desc ",
            countQuery = "SELECT COUNT(a.author_id) " +
                    "FROM authors a",
            nativeQuery = true
    )
    Page<Author> findAllByFamous(
            Pageable pageable
    );
}