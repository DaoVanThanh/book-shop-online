package com.example.bookshop.dto.response;

import com.example.bookshop.entity.Author;
import com.example.bookshop.entity.Book;
import com.example.bookshop.entity.Genre;
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
public class GetBookDetailResponse {

    private Long bookId;

    private String title;

    private String description;

    private Long price;

    private LocalDate publication_date;

    private Integer stockQuantity;

    private String imgUrl;

    private ArrayList<Author> authors;

    private ArrayList<Genre> genres;

    public void mapping(Book book) {
        this.bookId = book.getBookId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.price = book.getPrice();
        this.publication_date = book.getPublication_date();
        this.stockQuantity = book.getStockQuantity();
        this.imgUrl = book.getImgUrl();
//        this.authors = book.getAuthors();
//        this.genres = book.getGenres();
    }
}
