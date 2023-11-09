package com.example.bookshop.dto.response;

import com.example.bookshop.dto.BookReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetUserReviewResponse {
    private ArrayList<BookReview> bookReviews;
}
