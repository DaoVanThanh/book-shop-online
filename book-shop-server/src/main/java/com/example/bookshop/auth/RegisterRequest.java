package com.example.bookshop.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotNull
    private String fullName;

    @NotNull
    private String username;

    @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$")
    private String password;

    @NotNull
    private String address;

    @NotNull
    @Pattern(regexp = "^[0-9]+$")
    private String phoneNumber;
}
