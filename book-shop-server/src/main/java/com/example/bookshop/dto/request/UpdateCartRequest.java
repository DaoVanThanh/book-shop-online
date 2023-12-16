package com.example.bookshop.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCartRequest {
    @NotNull
    private Long bookId;

    @NotNull
    private Integer quantity;

    @NotNull
    private Boolean isAdded = false;
}
