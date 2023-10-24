package com.example.bookshop.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookQuantity {
    @NotNull
    private Long bookId;

    @NotNull
    private Integer quantity;
}
