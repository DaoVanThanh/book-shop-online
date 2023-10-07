package com.example.bookshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "genres")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genreId;

    @Column(name = "genre_name", unique = true)
    @NotNull
    private String genreName;

    @ManyToMany(mappedBy = "genres")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();
}
