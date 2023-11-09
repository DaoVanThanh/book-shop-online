package com.example.bookshop.dto;

import com.example.bookshop.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookReview {
    private Long bookId;
    private String content;
    private Integer point;
    private Date reviewDate;

    public static BookReview mappingFromReview(Review review) {
        return BookReview.builder()
                .bookId(review.getBook().getBookId())
                .content(review.getReview())
                .point(review.getPoint())
                .reviewDate(review.getReviewDate())
                .build();
    }

    public static ArrayList<BookReview> mappingFromReviews(ArrayList<Review> reviews) {
        ArrayList<BookReview> bookReviews = new ArrayList<>();
        for (Review review : reviews) {
            bookReviews.add(mappingFromReview(review));
        }
        return bookReviews;
    }
}
