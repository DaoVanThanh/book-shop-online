package com.example.bookshop.orm.request;

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
}
