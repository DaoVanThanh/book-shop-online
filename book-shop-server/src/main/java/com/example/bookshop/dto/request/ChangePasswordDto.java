package com.example.bookshop.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordDto {
    private String oldPassword;
    private String newPassword;

    public ChangePasswordDto() {
        super();
    }
}

