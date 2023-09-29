package com.example.bookshop.auth;

import lombok.Data;

@Data
public class AuthenticationRefreshRequest {
    String refreshToken;
}
