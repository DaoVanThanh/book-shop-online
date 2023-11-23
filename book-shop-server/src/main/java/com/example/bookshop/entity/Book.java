package com.example.bookshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(name = "title", unique = true)
    @NotNull
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    @Lob
    private String description;

    @Column(name = "price")
    private Long price;

    @Column(name = "publication_date")
    private LocalDate publication_date;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "img_url", columnDefinition = "LONGTEXT")
    @Lob
    private String imgUrl;

    @ManyToMany
    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    @JsonIgnore
    private Set<Author> authors = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "book_genre",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    @JsonIgnore
    private Set<Genre> genres = new HashSet<>();
}
