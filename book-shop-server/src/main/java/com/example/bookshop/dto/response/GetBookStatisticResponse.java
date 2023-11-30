package com.example.bookshop.dto.response;

public interface GetBookStatisticResponse {
    Long getBookId();

    String getTitle();

    Integer getTotalSold();

    Long getRevenue();
}
