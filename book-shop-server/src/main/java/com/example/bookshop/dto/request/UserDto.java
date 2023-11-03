package com.example.bookshop.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String username;
    private String fullName;
    private String phoneNumber;
    private String address;
    public UserDto() {
        super();
    }
}

