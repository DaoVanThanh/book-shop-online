package com.example.bookshop.dto.request;

import com.example.bookshop.entity.Book;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddBookRequest {

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private Long price;

    @NotNull
    private LocalDate publication_date;

    @NotNull
    private Integer stockQuantity;

    @NotNull
    private String imgUrl;

    @NotNull
    private ArrayList<String> author_names;

    @NotNull
    private ArrayList<String> genre_names;

    public Book mappingToBook() {
        Book book = new Book();
        book.setTitle(this.getTitle());
        book.setDescription(this.getDescription());
        book.setPrice(this.getPrice());
        book.setPublication_date(this.getPublication_date());
        book.setStockQuantity(this.getStockQuantity());
        book.setImgUrl(this.getImgUrl());
        return book;
    }
}
